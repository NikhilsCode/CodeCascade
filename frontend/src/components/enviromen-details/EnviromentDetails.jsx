import "./EnvironmentDetails.css"; // Include custom styles for invisible scrollbar

function EnvironmentDetails() {
  const environments = [
    {
      title: "Develop",
      branches: [
        "ERM_2548",
        "ERM_3641",
        "ERM_3641_new",
        "demo_master",
        "demo_dev",
        "Prod_hotfix_2451",
        "cal_config",
        "ERM_2549",
        "ERM_2548_new",
        "ERM_2558_prod",
        "ERM_3548",
        "ERM_3549",
        "ERM_3550",
      ],
    },
    {
      title: "Sandbox",
      branches: [
        "ERM_2548",
        "ERM_3641",
        "ERM_3641_new",
        "demo_master",
        "demo_dev",
        "Prod_hotfix_2451",
        "cal_config",
        "ERM_2549",
        "ERM_2548_new",
        "ERM_2558_prod",
        "ERM_3548",
        "ERM_3549",
        "ERM_3550",
      ],
    }
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Environment Details</h5>
        <div className="d-flex gap-2 input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Search by branch/commit"
          />
          <select className="form-select">
            <option>All environments</option>
            <option>Develop</option>
            <option>Sandbox</option>
            <option>Prod 1</option>
          </select>
        </div>
      </div>
      <div className="environment-container">
        {environments.map((env, index) => (
          <div key={index} className="environment-card">
            <h6>{env.title}</h6>
            <p className="text-muted">
              <i className="bi bi-branches"></i> Live branches
            </p>
            <ul className="list-unstyled">
              {env.branches.map((branch, i) => (
                <li key={i}>
                  {branch}
                  <hr className="p-0 my-1" />
                </li>
              ))}
            </ul>
            <a href="#" className="text-primary">
              Load more...
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnvironmentDetails;
