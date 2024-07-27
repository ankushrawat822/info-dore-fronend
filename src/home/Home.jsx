import React from 'react'
import "./home.css"
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <>
        <header>
    
    <section className="hero hero-bg r">
      {/* img */}
      <div className="hero-text b">
        <h2>Empowering Government Efficiency</h2>
        <p>
          Revolutionizing asset management with innovative solutions for
          transparency, efficiency, and sustainability.
        </p>
        <Link to="/dashboard" className="btn-primary my-4">
          Get Started
        </Link>
      </div>
    </section>
  </header>
  <main>
    <section id="about">
      <div className="container ">
        <h2 className='font-semibold text-gray-700 text-xl'>About Us</h2>
        <div className="about-content ">
          {/* <img src="about-image.jpg" alt="About Us" class="about-img"> */}
          <p>
            At INFO'DORE, our mission is to revolutionize the way government
            agencies manage their assets. With a commitment to transparency,
            efficiency, and sustainability, we provide cutting-edge solutions
            that enhance asset tracking, optimize resource utilization, and
            ensure accountability.
          </p>
        </div>
      </div>
    </section>
    {/* <section id="features">
      <div class="container">
          <h2>Key Features</h2>
          <div class="feature-grid">
              <div class="feature">
                  <img src="feature1.jpg" alt="Comprehensive Asset Tracking">
                  <h3>Comprehensive Asset Tracking</h3>
                  <p>Monitor and manage assets in real-time with our robust tracking systems.</p>
              </div>
              <div class="feature">
                  <img src="feature2.jpg" alt="Optimized Resource Allocation">
                  <h3>Optimized Resource Allocation</h3>
                  <p>Utilize advanced analytics to ensure assets are used effectively and efficiently.</p>
              </div>
              <div class="feature">
                  <img src="feature3.jpg" alt="Data-Driven Insights">
                  <h3>Data-Driven Insights</h3>
                  <p>Access detailed reports and dashboards for informed decision-making.</p>
              </div>
              <div class="feature">
                  <img src="feature4.jpg" alt="Compliance & Accountability">
                  <h3>Compliance & Accountability</h3>
                  <p>Ensure adherence to regulations and standards with our compliance tools.</p>
              </div>
          </div>
      </div>
  </section> */}
    <section id="solutions">
      <div className="container">
        <h2>Solutions</h2>
        <div className="solution">
          <h3>Asset Management Software</h3>
          <p>
            Streamline your asset lifecycle from acquisition to disposal with
            our integrated software solutions.
          </p>
        </div>
        <div className="solution">
          <h3>Data Analytics &amp; Reporting</h3>
          <p>
            Leverage powerful analytics to gain insights into asset performance
            and make data-driven decisions.
          </p>
        </div>
        <div className="solution">
          <h3>Compliance &amp; Auditing Tools</h3>
          <p>
            Simplify compliance with automated auditing and reporting features
            tailored for government requirements.
          </p>
        </div>
        <div className="solution">
          <h3>Customizable Integration</h3>
          <p>
            Seamlessly integrate with existing systems and tailor solutions to
            fit specific needs.
          </p>
        </div>
      </div>
    </section>
    {/* <section id="success-stories">
      <div class="container">
          <h2>Success Stories</h2>
          <div class="case-study">
              <h3>City of Indore</h3>
              <p>Discover how INFO'DORE helped the City of Indore reduce asset management costs by 30% and improve operational efficiency.</p>
          </div>
          <div class="case-study">
              <h3>[Example Agency]</h3>
              <p>Learn about the impact of our solutions on [Example Agency] and their journey towards a more transparent and accountable asset management system.</p>
          </div>
      </div>
  </section> */}
    <section id="contact">
      <div className="container">
        <h2>Get Started</h2>
        <p>
          Ready to transform your asset management? Contact us for a free
          consultation or request a demo to see our solutions in action.
        </p>
        <ul>
          <li>
            <strong>Contact Us:</strong> [Phone Number] | [Email Address]
          </li>
          <li>
            <strong>Request a Demo:</strong>{" "}
            <a href="#">[Link to Demo Request Form]</a>
          </li>
          <li>
            <strong>Download Brochure:</strong>{" "}
            <a href="#">[Link to Brochure]</a>
          </li>
        </ul>
      </div>
    </section>
    <section id="news-updates">
      <div className="container">
        <h2>News &amp; Updates</h2>
        <div className="news-item">
          <h3>[Recent Blog Post Title]</h3>
          <p>
            Brief overview and <a href="#">link to the full post</a>.
          </p>
        </div>
        <div className="news-item">
          <h3>[Upcoming Webinar Title]</h3>
          <p>
            Details about upcoming events and <a href="#">how to register</a>.
          </p>
        </div>
      </div>
    </section>
  </main>
  <footer>
    <div className="container">
      <p>© 2024 INFO'DORE. All rights reserved.</p>
      <ul>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms of Service</a>
        </li>
      </ul>
      <div className="social-media">
        <a href="#">
          <img src="facebook-icon.png" alt="Facebook" />
        </a>
        <a href="#">
          <img src="twitter-icon.png" alt="Twitter" />
        </a>
        <a href="#">
          <img src="linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a href="#">
          <img src="youtube-icon.png" alt="YouTube" />
        </a>
      </div>
    </div>
  </footer>
    </>
  )
}

export default Home