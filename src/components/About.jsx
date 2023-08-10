
import React, { useState } from 'react';

const About = () => {
  const [showTeam, setShowTeam] = useState(false);

  const handleShowTeam = () => {
    setShowTeam(!showTeam);
  };

  const styles = {
    color: 'white',
  };

  return (
    <div className="about-container">
      <h2>Welcome to Event Craft</h2>
      <p>
        The premier event management platform that takes the stress out of organizing memorable and flawless events. Whether you're planning a grand corporate conference, a spectacular wedding, a dynamic trade show, or any other special occasion, Event Craft is here to be your trusted partner in bringing your visions to life.

        At Event Craft, we understand that every event is unique, and we pride ourselves on offering a comprehensive suite of tools and services tailored to meet your specific needs. From the initial concept to the final execution, our platform is designed to simplify the event planning process, allowing you to focus on what truly matters – creating extraordinary experiences for your guests.

        Why Choose Event Craft?

        Simplicity and Efficiency: With our user-friendly interface, you can effortlessly manage every aspect of your event. From guest registrations and ticket sales to venue selection and vendor coordination, we provide intuitive tools that streamline the entire planning journey.

        Endless Possibilities: No event is too big or too small for Event Craft. Whether it's a small private gathering or a large-scale international convention, our platform adapts to your requirements, ensuring a seamless planning experience regardless of the event's scale or complexity.

        Collaborative Features: Planning an event often involves teamwork, and Event Craft excels at fostering collaboration. Invite team members, share tasks, and communicate seamlessly within the platform to keep everyone on the same page and working towards a common goal.

        Vendor Network: Gain access to our extensive network of trusted vendors and suppliers, handpicked for their exceptional service and quality. Find the perfect caterers, decorators, entertainers, and more, all with the assurance of reliability and professionalism.

        Real-Time Insights: Make data-driven decisions with our real-time analytics and reporting tools. Track ticket sales, monitor attendance, and analyze attendee feedback to continuously improve and optimize your events.

        Unmatched Support: Our dedicated support team is always at your service, ready to assist you at every step of the planning process. From technical guidance to creative ideas, we're here to ensure your event is a resounding success.

        Whether you're an event planning veteran or a first-time organizer, Event Craft empowers you to orchestrate events that leave a lasting impression. Say goodbye to stress and welcome a new era of seamless event management.

        Join Event Craft today and embark on a journey where creativity knows no bounds, and every event is a masterpiece waiting to be crafted!
      </p>
      <button onClick={handleShowTeam}>
        {showTeam ? 'Hide Team Members' : 'Show Team Members'}
      </button>
      {showTeam && (
        <div className="team-members">
          <h3>Meet Our Team</h3>
          <ul>
            <li>John Doe - Event Manager</li>
            <li>Jane Smith - Marketing Coordinator</li>
            <li>Michael Johnson - Logistics Specialist</li>
            <li>Emily Brown - Communication Officer</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default About;