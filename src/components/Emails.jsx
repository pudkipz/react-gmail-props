import PropTypes from 'prop-types'
import Email from './Email'

function Emails({filteredEmails, setEmails, openedEmail, setOpenedEmail, currentView, setCurrentView}) {
  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  const openEmail = targetEmail => {
    openedEmail = targetEmail
    setOpenedEmail(openedEmail)
    currentView = 'email'
    setCurrentView(currentView)
  }

  return (<>
      <ul className='emails'>
        {filteredEmails.map((email, index) => (
          <Email key={index} email={email} toggleStar={toggleStar} toggleRead={toggleRead} openEmail={openEmail}/>
        ))}
      </ul>
  </>)
}

export default Emails

Emails.propTypes = {
  filteredEmails: PropTypes.array,
  setEmails: PropTypes.func,
}