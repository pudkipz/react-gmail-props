import PropTypes from 'prop-types'
import Email from './Email'

function Emails({filteredEmails, setEmails}) {
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

  return (<>
    <main className="emails">
      <ul>
        {filteredEmails.map((email, index) => (
          <Email key={index} email={email} toggleStar={toggleStar} toggleRead={toggleRead}/>
        ))}
      </ul>
    </main>
  </>)
}

export default Emails

Emails.propTypes = {
  filteredEmails: PropTypes.object,
  setEmails: PropTypes.func,
}