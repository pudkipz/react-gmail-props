import PropTypes from 'prop-types'

function Email({index, email, toggleStar, toggleRead, openEmail}) {
  return (<>
    <li
      key={index}
      className={`email ${email.read ? 'read' : 'unread'}`}
      onClick={() => openEmail(email)}
    >
      <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          checked={email.read}
          onChange={() => toggleRead(email)}
        />
      </div>
      <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          onChange={() => toggleStar(email)}
        />
      </div>
      <div className="sender">{email.sender}</div>
      <div className="title">{email.title}</div>
    </li>
  
  </>)
}

export default Email

Email.propTypes = {
  index: PropTypes.number,
  email: PropTypes.object,
  toggleStar: PropTypes.func,
  toggleRead: PropTypes.func,
  openEmail: PropTypes.func,
}