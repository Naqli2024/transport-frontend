import React, {
  useRef,
  useState,
} from 'react';

const Color = () => {
  const canvasRef = useRef(null);

  const [image, setImage] =
    useState(null);

  const [tooltip, setTooltip] =
    useState(null);

  const [selectedColor, setSelectedColor] =
    useState('');

  const handleUpload = e => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setImage(imageUrl);
  };

  const rgbToHex = (r, g, b) => {
    return (
      '#' +
      [r, g, b]
        .map(x =>
          x
            .toString(16)
            .padStart(2, '0')
        )
        .join('')
        .toUpperCase()
    );
  };

  const getPixelColor = e => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext('2d');

    const rect =
      canvas.getBoundingClientRect();

    // REAL canvas scale
    const scaleX =
      canvas.width / rect.width;

    const scaleY =
      canvas.height / rect.height;

    // Accurate coordinates
    const x = Math.floor(
      (e.clientX - rect.left) *
        scaleX
    );

    const y = Math.floor(
      (e.clientY - rect.top) *
        scaleY
    );

    const pixel =
      ctx.getImageData(
        x,
        y,
        1,
        1
      ).data;

    const hex = rgbToHex(
      pixel[0],
      pixel[1],
      pixel[2]
    );

    return {
      x:
        e.clientX -
        rect.left,
      y:
        e.clientY -
        rect.top,
      hex,
    };
  };

  const handleMouseMove = e => {
    const color =
      getPixelColor(e);

    setTooltip(color);
  };

  const handleClick = e => {
    const color =
      getPixelColor(e);

    setSelectedColor(
      color.hex
    );
  };

  const handleImageLoad = e => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext('2d');

    const img = e.target;

    canvas.width = img.naturalWidth;
    canvas.height =
      img.naturalHeight;

    ctx.drawImage(
      img,
      0,
      0
    );
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily:
          'sans-serif',
      }}
    >
      <h2>
        Accurate Cloth Color Picker
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {image && (
        <div
          style={{
            marginTop: 20,
          }}
        >
          <img
            src={image}
            alt="hidden"
            onLoad={
              handleImageLoad
            }
            style={{
              display: 'none',
            }}
          />

          <div
            style={{
              position:
                'relative',
              display:
                'inline-block',
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseMove={
                handleMouseMove
              }
              onClick={
                handleClick
              }
              style={{
                width: 500,
                maxWidth:
                  '100%',
                borderRadius: 12,
                cursor:
                  'crosshair',
                border:
                  '1px solid #ccc',
              }}
            />

            {tooltip && (
              <div
                style={{
                  position:
                    'absolute',
                  left:
                    tooltip.x +
                    15,
                  top:
                    tooltip.y +
                    15,
                  background:
                    '#000',
                  color: '#fff',
                  padding:
                    '6px 10px',
                  borderRadius: 8,
                  fontSize: 12,
                  pointerEvents:
                    'none',
                }}
              >
                {tooltip.hex}
              </div>
            )}
          </div>

          {selectedColor && (
            <div
              style={{
                marginTop: 20,
                textAlign:
                  'center',
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  background:
                    selectedColor,
                  margin:
                    '0 auto 10px',
                  borderRadius: 12,
                  border:
                    '2px solid #000',
                }}
              />

              <h3>
                {selectedColor}
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Color;