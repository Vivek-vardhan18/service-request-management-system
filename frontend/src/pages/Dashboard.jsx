import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/request/myrequests",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

  const createRequest = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/request/create",
        {
          title,
          description
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Request Created Successfully");

      setTitle("");
      setDescription("");

      fetchRequests();
    } catch (err) {
      console.log(err);
      alert("Failed to create request");
    }
  };

  return (
  <div>
    <Navbar />

    <div className="container mt-4">

      <h1 className="text-center mb-4">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="row text-center mb-4">

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Requests</h5>
              <h2>{requests.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Pending</h5>
              <h2>
                {
                  requests.filter(
                    (r) => r.status === "Pending"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Completed</h5>
              <h2>
                {
                  requests.filter(
                    (r) => r.status === "Completed"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Create Request Card */}
      <div className="card p-4 mb-4">

        <h2>Create Request</h2>

        <form onSubmit={createRequest}>

          <input
            className="form-control"
            type="text"
            placeholder="Request Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />

          <textarea
            className="form-control"
            placeholder="Request Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />

          <button
            className="btn btn-primary"
            type="submit"
          >
            Create Request
          </button>

        </form>

      </div>

      {/* My Requests */}
      <h2 className="mb-3">My Requests</h2>

      {requests.map((req) => (
        <div className="card mb-3" key={req.id}>
          <div className="card-body">

            <h4>{req.title}</h4>

            <p>{req.description}</p>

            <p>
              Status:
              <span
                className={
                  req.status === "Completed"
                    ? "badge bg-success ms-2"
                    : req.status === "Pending"
                    ? "badge bg-warning text-dark ms-2"
                    : "badge bg-primary ms-2"
                }
              >
                {req.status}
              </span>
            </p>

          </div>
        </div>
      ))}

    </div>
  </div>
);
}
export default Dashboard;