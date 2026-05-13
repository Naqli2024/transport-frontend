export const riskBadge = (r) => {
  if (r === "HIGH") return <span className="risk-high">HIGH RISK</span>;
  if (r === "MEDIUM") return <span className="risk-med">MEDIUM</span>;
  return <span className="risk-low">LOW RISK</span>;
};
export const tripExpTotal = (exp) => Object.values(exp).reduce((s, v) => s + v, 0);
export const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const pct = (a, b) => b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "0%";