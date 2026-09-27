import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Sharmila",
    email: "sharmilap40@gmail.com",
    phone: "8754709346",
    bio: "Computer Science graduate interested in Full Stack Development.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    setIsEditing(false);
    setMessage("Profile updated successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          {/* Page Header */}
          <div className="mb-4">
            <h2 className="fw-bold">My Profile</h2>
            <p className="text-muted mb-0">
              Manage your personal information and learning profile.
            </p>
          </div>

          {message && <div className="alert alert-success">{message}</div>}

          <div className="row g-4">
            {/* Profile Information */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Personal Information</h4>

                    <button
                      type="button"
                      className={`btn ${
                        isEditing ? "btn-outline-secondary" : "btn-primary"
                      }`}
                      onClick={() => {
                        setIsEditing(!isEditing);
                        setMessage("");
                      }}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  <form onSubmit={handleSave}>
                    {/* Name */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Bio</label>

                      <textarea
                        name="bio"
                        className="form-control"
                        rows="4"
                        value={profile.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    {isEditing && (
                      <button type="submit" className="btn btn-success">
                        Save Changes
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4 text-center">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "90px",
                      height: "90px",
                      fontSize: "2rem",
                    }}
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </div>

                  <h4 className="fw-bold mb-1">{profile.name}</h4>

                  <p className="text-muted mb-3">Student</p>

                  <span className="badge bg-success">Active Learner</span>
                </div>
              </div>

              {/* Learning Stats */}
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Learning Statistics</h5>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Enrolled Courses</span>
                    <strong>3</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Completed Lessons</span>
                    <strong>12</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Quiz Average</span>
                    <strong>82%</strong>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Overall Progress</span>
                    <strong>68%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
