import React, { useState, useEffect } from "react"; // ✅ Add useState & useEffect
import { Link } from "react-router-dom";
import axios from "axios";

export default function MainContent() {
  const [departments, setDepartments] = useState([]); // dynamic state for departments
  const [doctors, setDoctors] = useState([]); // dynamic state for doctors

  useEffect(() => {
    // Fetch departments from backend
    axios
      .get("http://localhost:8000/api/departments") // Departments API endpoint
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  useEffect(() => {
  // Fetch doctors from backend
  axios
    .get("http://localhost:8000/api/doctors") // Doctors API endpoint
    .then((res) => setDoctors(res.data))
    .catch((err) => console.error(err));
  }, []);

  return (
    <main className="main" id="top">
      {/* HERO */}
      <section className="py-xxl-10 pb-0" id="home">
        <div
          className="bg-holder bg-size"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/hero-bg.png)`,
            backgroundPosition: "top center",
            backgroundSize: "cover",
          }}
        />
        <div className="container">
          <div className="row min-vh-xl-100 min-vh-xxl-25">
            <div className="col-md-5 col-xl-6 col-xxl-7 order-0 order-md-1 text-end">
              <img
                className="pt-7 pt-md-0 w-100"
                src={`${process.env.PUBLIC_URL}/assets/img/gallery/hero.png`}
                alt="hero-header"
              />
            </div>
            <div className="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center py-6">
              <h1 className="fw-light font-base fs-6 fs-xxl-7">
                We're <strong>determined </strong>for
                <br />
                your&nbsp;<strong>better life.</strong>
              </h1>
              <p className="fs-1 mb-5">
                You can get the care you need 24/7 – be it online or in <br />
                person. You will be treated by caring specialist doctors.
              </p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/appointments/add" role="button">
                Make an Appointment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS TITLE */}
      <section className="py-5" id="departments">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div
                className="bg-holder bg-size"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/bg-departments.png)`,
                  backgroundPosition: "top center",
                  backgroundSize: "contain",
                }}
              />
              <h1 className="text-center">OUR DEPARTMENTS</h1>
            </div>
          </div>
        </div>
      </section>

    
{/* DEPARTMENTS ICONS - All in one row */}
{/* DEPARTMENTS ICONS - All in one row */}
<section className="py-0">
  <div className="container">
    <div
      className="d-flex flex-row overflow-auto py-5 align-items-center"
      style={{ gap: "2rem" }} // Space between items
    >
      {departments.map((dept) => (
        <div
          key={dept._id}
          className="text-center flex-shrink-0"
          style={{ width: "150px" }}
        >
          <img
            src={`http://localhost:8000/uploads/${dept.image}`}
            alt={dept.name}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              borderRadius: "8px",
              pointerEvents: "none",
              transform: "none",
              transition: "none",
            }}
          />
          <p
            className="fs-1 fs-xxl-2 text-center"
            style={{
              fontWeight: "700", // bold
              pointerEvents: "none",
              transform: "none",
              transition: "none",
              marginTop: "0.5rem",
            }}
          >
            {dept.name}
          </p>
          <Link to={`/departments/${dept._id}`} style={{ textDecoration: "none" }}>
            <button
              className="btn mt-2"
              style={{
                backgroundColor: "#0b1e5b", // dark blue
                color: "#fff",
                border: "1px solid #0b1e5b",
                borderRadius: "50px",
                padding: "6px 16px",
                fontSize: "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#0b1e5b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0b1e5b";
                e.currentTarget.style.color = "#fff";
              }}
            >
              Read More
            </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>







      {/* EYE CARE */}
      <section className="bg-secondary">
        <div
          className="bg-holder"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/bg-eye-care.png)`,
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 col-xxl-6">
              <img
                className="img-fluid"
                src={`${process.env.PUBLIC_URL}/assets/img/gallery/eye-care.png`}
                alt="eye care"
              />
            </div>
            <div className="col-md-7 col-xxl-6 text-center text-md-start">
              <h2 className="fw-bold text-light mb-4 mt-4 mt-lg-0">
                Eye Care with Top Professionals<br className="d-none d-sm-block" />
                and In Budget.
              </h2>
              <p className="text-light">
                We've built a healthcare system that puts your needs first.
                <br className="d-none d-sm-block" />
                For us, there is nothing more important than the health of
                <br className="d-none d-sm-block" />
                you and your loved ones.
              </p>
              <div className="py-3">
                <a className="btn btn-lg btn-light rounded-pill" href="#!" role="button">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="pb-0" id="about">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div
                className="bg-holder bg-size"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/about-us.png)`,
                  backgroundPosition: "top center",
                  backgroundSize: "contain",
                }}
              />
              <h1 className="text-center">ABOUT US</h1>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-5">
        <div
          className="bg-holder bg-size"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/about-bg.png)`,
            backgroundPosition: "top center",
            backgroundSize: "contain",
          }}
        />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-lg-1 mb-5 mb-lg-0">
              <img
                className="fit-cover rounded-circle w-100"
                src={`${process.env.PUBLIC_URL}/assets/img/gallery/health-care.png`}
                alt="health care"
              />
            </div>
            <div className="col-md-6 text-center text-md-start">
              <h2 className="fw-bold mb-4">
                We are developing a healthcare <br className="d-none d-sm-block" />
                system around you
              </h2>
              <p>
                We think that everyone should have easy access to excellent
                <br className="d-none d-sm-block" />
                healthcare. Our aim is to make the procedure as simple as
                <br className="d-none d-sm-block" />
                possible for our patients and to offer treatment no matter
                <br className="d-none d-sm-block" />
                where they are — in person or at their convenience.
              </p>
              <div className="py-3">
                <button className="btn btn-lg btn-outline-primary rounded-pill" type="button">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS (carousel) */}
      <section className="pb-0">
          <div className="container">
            <div className="row">
              <div className="col-12 py-3">
                <div
                  className="bg-holder bg-size"
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/doctors-us.png)`,
                    backgroundPosition: "top center",
                    backgroundSize: "contain",
                  }}
                />
                <h1 className="text-center">OUR DOCTORS</h1>
              </div>
            </div>
          </div>
        </section>

       
        <section className="py-5">
  <div className="container">
    <div className="row">
      {doctors.length > 0 ? (
        doctors.map((doc) => (
          <div className="col-md-4 mb-4" key={doc._id}>
            <div className="card h-100 shadow">
              <div className="card-body text-center">
                <img
                  src={doc.photo || "/images/default-doctor.png"}
                  alt={doc.name}
                  style={{ width: "128px", height: "128px", objectFit: "cover", borderRadius: "50%" }}
                />

                <h5 className="mt-3">{doc.name}</h5>
                <p className="mb-1">{doc.specialization}</p>
                {doc.department && <p className="text-muted">{doc.department.name}</p>}
                <p className="text-muted">{doc.experience} years experience</p>

                <Link to={`/doctor/${doc._id}`}>
                  <button className="btn btn-outline-secondary rounded-pill mt-2">
                    View Profile
                  </button>
                </Link>

              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No doctors available.</p>
      )}
    </div>
  </div>
</section>



      {/* PEOPLE WHO LOVE US & Carousel */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div className="bg-holder bg-size" style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/people.png)`,
                backgroundPosition: "top center",
                backgroundSize: "contain",
              }} />
              <h1 className="text-center">PEOPLE WHO LOVE US</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="bg-holder bg-size" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/people-bg-1.png)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }} />
        <div className="container">
          <div className="row align-items-center offset-sm-1">
            <div className="carousel slide" id="carouselPeople" data-bs-ride="carousel">
              <div className="carousel-inner">
                {[
                  ["Edward Newgate", "Founder Circle"],
                  ["Jhon Doe", "UI/UX Designer"],
                  ["Jeny Doe", "Web Designer"],
                ].map(([name, role], idx) => (
                  <div className={`carousel-item ${idx === 0 ? "active" : ""}`} data-bs-interval={idx === 0 ? 10000 : idx === 1 ? 2000 : undefined} key={name}>
                    <div className="row h-100">
                      <div className="col-sm-3 text-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/img/gallery/people-who-loves.png`} width="100" alt="" />
                        <h5 className="mt-3 fw-medium text-secondary">{name}</h5>
                        <p className="fw-normal mb-0">{role}</p>
                      </div>
                      <div className="col-sm-9 text-center text-sm-start pt-3 pt-sm-0">
                        <h2>Fantastic Response!</h2>
                        <div className="my-2">
                          <i className="fas fa-star me-2"></i>
                          <i className="fas fa-star me-2"></i>
                          <i className="fas fa-star me-2"></i>
                          <i className="fas fa-star-half-alt me-2"></i>
                          <i className="far fa-star"></i>
                        </div>
                        <p>
                          This medical and health care facility distinguishes itself from the
                          competition by providing technologically advanced medical and health
                          care. A mobile app and a website are available via which you can
                          easily schedule appointments, get online consultations, and see
                          physicians, who will assist you through the whole procedure. And all
                          of the prescriptions, medications, and other services they offer are
                          100% genuine, medically verified, and proved. I believe that the
                          Livedoc staff is doing an outstanding job. Highly recommended their
                          health care services.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="position-relative z-index-2 mt-5">
                  <ol className="carousel-indicators">
                    <li className="active" data-bs-target="#carouselPeople" data-bs-slide-to="0"></li>
                    <li data-bs-target="#carouselPeople" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselPeople" data-bs-slide-to="2"></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT + FORM */}
      {/* <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div className="bg-holder bg-size" style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/people.png)`,
                backgroundPosition: "top center",
                backgroundSize: "contain",
              }} />
              <h1 className="text-center">APPOINTMENT</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 z-index-2 mb-5">
              <img className="w-100" src={`${process.env.PUBLIC_URL}/assets/img/gallery/appointment.png`} alt="appointment" />
            </div>
            <div className="col-lg-6 z-index-2">
              <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
                <div className="col-md-6">
                  <label className="visually-hidden" htmlFor="inputName">Name</label>
                  <input className="form-control form-livedoc-control" id="inputName" type="text" placeholder="Name" />
                </div>
                <div className="col-md-6">
                  <label className="visually-hidden" htmlFor="inputPhone">Phone</label>
                  <input className="form-control form-livedoc-control" id="inputPhone" type="text" placeholder="Phone" />
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="inputCategory">Category</label>
                  <select className="form-select" id="inputCategory" defaultValue="Category">
                    <option>Category</option>
                    <option>Category One</option>
                    <option>Category Two</option>
                    <option>Category Three</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label visually-hidden" htmlFor="inputEmail">Email</label>
                  <input className="form-control form-livedoc-control" id="inputEmail" type="email" placeholder="Email" />
                </div>
                <div className="col-md-12">
                  <label className="form-label visually-hidden" htmlFor="validationTextarea">Message</label>
                  <textarea className="form-control form-livedoc-control" id="validationTextarea" placeholder="Message" style={{ height: "250px" }} required></textarea>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-primary rounded-pill" type="submit">Sign in</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}

      {/* BLOG POSTS */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 py-3">
              <div className="bg-holder bg-size" style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/blog-post.png)`,
                backgroundPosition: "top center",
                backgroundSize: "contain",
              }} />
              <h1 className="text-center">RECENT BLOGPOSTS</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-holder bg-size" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/dot-bg.png)`,
          backgroundPosition: "top left",
          backgroundSize: "auto",
        }} />
        <div className="container">
          <div className="row">
            {[
              ["covid-19.png", "Health", "Nov 21, 2021", "COVID-19: The Most Up-to-Date Information"],
              ["laboratories.png", "Lifestyle", "Nov 25, 2021", "Importance of Accreditation for Laboratories"],
              ["nicotine.png", "Health", "Nov 28, 2021", "The dangers of nicotine are addressed in depth"],
              ["treatment.png", "Health", "Nov 30, 2021", "Treatment of patients with diabetes during COVID-19"],
            ].map(([img, tag, date, title]) => (
              <div className="col-sm-6 col-lg-3 mb-4" key={title}>
                <div className="card h-100 shadow card-span rounded-3">
                  <img className="card-img-top rounded-top-3" src={`${process.env.PUBLIC_URL}/assets/img/gallery/${img}`} alt={title} />
                  <div className="card-body">
                    <span className="fs--1 text-primary me-3">{tag}</span>
                    <svg className="bi bi-calendar2 me-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"></path>
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"></path>
                    </svg>
                    <span className="fs--1 text-900">{date}</span>
                    <h5 className="font-base fs-lg-0 fs-xl-1 my-3">{title}</h5>
                    <a className="stretched-link" href="#!">read full article</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="bg-holder bg-size" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/gallery/cta-bg.png)`,
          backgroundPosition: "center right",
          marginTop: "-8.125rem",
          backgroundSize: "contain",
        }} />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="fw-bold text-light">Get an update every week</h2>
              <p className="text-soft-primary">
                Livedoc was created in order to improve the patient experience. <br />Providing world-class tests, and a wide range of other services.
              </p>
            </div>
            <div className="col-lg-6">
              <h5 className="mb-3 text-soft-primary">SUBSCRIBE TO NEWSLETTER </h5>
              <form className="row gx-2 gy-2 align-items-center" onSubmit={(e) => e.preventDefault()}>
                <div className="col">
                  <div className="input-group-icon">
                    <label className="visually-hidden" htmlFor="inputEmailCta">Address</label>
                    <input className="form-control form-livedoc-control form-cta-control text-soft-primary" id="inputEmailCta" type="email" placeholder="Email" />
                  </div>
                </div>
                <div className="d-grid gap-3 col-sm-auto">
                  <button className="btn btn-lg btn-light rounded-3 px-5 py-3" type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
