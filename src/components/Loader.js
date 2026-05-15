import React from "react";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="spinner-loader">
      <div className="spinner-scene">
        <div className="spinner-track-wrap">

          {/* Truck (horizontal drive wrapper → icon bobs inside) */}
          <div className="spinner-truck">
            <LocalShippingOutlinedIcon className="spinner-icon" />
          </div>

          {/* Road: dashes scroll backward, amber fill chases truck */}
          <div className="spinner-road">
            <div className="spinner-road-dashes" />
            <div className="spinner-progress" />
          </div>

        </div>

        {/* Animated label */}
        <p className="spinner-label">
          Loading
          <span className="spinner-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Loader;