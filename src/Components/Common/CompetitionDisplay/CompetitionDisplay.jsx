import React from 'react'
import './CompetitionDisplay.css'

const CompetitionDisplay = () => {
  return (
    <div className="CompetitionDisplay">
      <div className="competitionDisplay-left">
        <h1>Week 1 Competition</h1>
        <div className="competitionDisplay-left-content">
          <h2 className='competition-title'>Frontend Competition Rules and Regulations</h2>
          <ol className="rules-list">
            <li>
              <div className='rule-heading'>Eligibility:</div>
              <ul>
                <li>The competition is open to all participants with an interest in frontend development.</li>
                <li>Participants must register on the competition platform before the deadline to be eligible.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Submission Guidelines:</div>
              <ul>
                <li>Participants must submit their entries before the specified deadline. Late submissions will not be considered.</li>
                <li>Each submission should be a fully functional frontend project that meets the requirements specified in the challenge description.</li>
                <li>The project must be original and developed solely by the participant or the team (if applicable).</li>
                <li>Submissions should include the complete source code, with comments and documentation where necessary.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Team Participation:</div>
              <ul>
                <li>Participants can compete individually or as a team. Teams can have up to 4 members.</li>
                <li>Each team member's contribution should be clearly defined.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Use of Libraries and Frameworks:</div>
              <ul>
                <li>Participants are allowed to use frontend libraries and frameworks (e.g., React, Vue, Angular) unless otherwise specified in the challenge.</li>
                <li>The use of code generators or AI tools is prohibited unless explicitly allowed.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Judging Criteria:</div>
              <ul>
                <li>Submissions will be evaluated based on creativity, design, responsiveness, code quality, and adherence to the challenge requirements.</li>
                <li>The judges' decisions are final and binding.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Plagiarism:</div>
              <ul>
                <li>Plagiarism of any kind will result in immediate disqualification. All submissions must be the original work of the participant or team.</li>
                <li>Participants may not submit work that has been previously submitted to other competitions.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Communication:</div>
              <ul>
                <li>All communication during the competition should be conducted through the official competition platform or designated channels.</li>
                <li>Participants must adhere to a code of conduct, which includes respect and professionalism towards other participants and organizers.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Intellectual Property:</div>
              <ul>
                <li>Participants retain ownership of their submissions. However, by submitting an entry, participants grant the organizers the right to showcase the project on their platform and in promotional materials.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Disqualification:</div>
              <ul>
                <li>Participants may be disqualified for violating the rules, including but not limited to plagiarism, late submissions, and unsportsmanlike conduct.</li>
                <li>Disqualified participants will forfeit any prizes or points they may have earned.</li>
              </ul>
            </li>
            <li>
              <div className='rule-heading'>Amendments:</div>
              <ul>
                <li>The organizers reserve the right to modify the rules and regulations at any time. Participants will be notified of any changes.</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div className="competitionDisplay-right">
        <h2>Prizes</h2>
        <ul className="prize-list">
          <li><strong>1st Place:</strong> 500 Points</li>
          <li><strong>2nd Place:</strong> 300 Points</li>
          <li><strong>3rd Place:</strong> 200 Points</li>
          <li><strong>Participation:</strong> 50 Points </li>
        </ul>
      </div>
    </div>
  )
}

export default CompetitionDisplay