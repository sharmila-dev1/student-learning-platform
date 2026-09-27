function ProgressBar({ value }) {
  return (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <small className="text-muted">Progress</small>
        <small className="fw-semibold">{value}%</small>
      </div>

      <div
        className="progress"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="progress-bar" style={{ width: `${value}%` }}>
          {value}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
