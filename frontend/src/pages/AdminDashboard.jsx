import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/request/all"
      );

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/request/update/${id}`,
        { status },
        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteRequest = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this request?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/request/delete/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    fetchRequests();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>
<div className="container mt-4">
      <div className="row text-center">

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
                {requests.filter(
                  r => r.status === "Pending"
                ).length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Completed</h5>
              <h2>
                {requests.filter(
                  r => r.status === "Completed"
                ).length}
              </h2>
            </div>
          </div>
        </div>

      </div>
    </div>
      <h2>All Service Requests</h2>

      <table border="1" width="100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {requests.map((req) => (
      <tr key={req.id}>
        <td>{req.id}</td>
        <td>{req.title}</td>
        <td>{req.description}</td>
        <td>{req.status}</td>

        <td>
          <button
            onClick={() =>
              updateStatus(req.id, "Pending")
            }
          >
            Pending
          </button>

          <button
            onClick={() =>
              updateStatus(req.id, "In Progress")
            }
          >
            In Progress
          </button>

          <button
            onClick={() =>
              updateStatus(req.id, "Completed")
            }
          >
            Completed
          </button>

          <button
            onClick={() => deleteRequest(req.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default AdminDashboard;