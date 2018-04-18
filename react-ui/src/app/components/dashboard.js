import React from 'react';

function Dashboard(props) {
  return (
    <div className="dashboard__container">
      This is the user's dashboard, woo.
      <button onClick={() => props.createEmail()}>
        Create a new email
      </button>
      <button onClick={() => props.viewProfile()}>
        View Profile/Settings
      </button>
      <button onClick={() => props.viewEmails()}>
        View past emails. NEED TO DEFINE SCOPE AND SEE IF THIS IS SOMETHING YOU'RE GOING TO KEEP. IS THIS MVP MATERIAL?
      </button>
    </div>
  );
}

export default Dashboard;

// what does our dashboard look like?

// series of icons to go to the email slicing, then profile, then email history (coming soon), settings (same as profile), stats, other misc stuff like that, billing info etc.

// maybe these should all be little expanding accordions? That could be cool? Or they could link through. I don't know.

// i dont think they should be accordions? doesnt put the user definitively anywhere. Maybe accordions in the email build phase.

// liiiike, give it a name, upload an image, begin to slice, output? that might be nice, vertical design.

// For this one, little icons? Maybe history/profile could expand out?

// maybe have those two in a top seciton, and then the other in a section udnerneath. just some sort of visual seperation, or even just open into a new page. that'd work alright probs.

// clicking on main logo should take you home if logged out, dashboard if logged in.
