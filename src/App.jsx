import { useState } from 'react'

import initialEmails from './data/emails'

import Emails from './components/Emails'
import EmailView from './components/EmailView'

import './styles/App.css'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

const getSearchEmails = (searchInput, emails) => {
  const fMail = emails.filter(email => email.title.toLowerCase().includes(searchInput.toLowerCase()))
  return fMail
}


function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [currentView, setCurrentView] = useState('inbox')  // can be: inbox, email
  const [openedEmail, setOpenedEmail] = useState(0)  // default value?
  const [searchInput, setSearchInput] = useState('')

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  let filteredEmails = emails

  if (searchInput != '') {
    filteredEmails = getSearchEmails(searchInput, filteredEmails)
  }

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)

  const openInbox = () => {
    setCurrentView('inbox')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="left-menu">
          <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail logo"
            onClick={openInbox}
          />
        </div>
        <div className="search">
          <input
          className="search-bar"
          placeholder="Search mail"
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
          />
        </div>
      </header>
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main>
        {currentView == 'inbox' ? (
        <Emails filteredEmails={filteredEmails} setEmails={setEmails} openedEmail={openedEmail} setOpenedEmail={setOpenedEmail} currentView={currentView} setCurrentView={setCurrentView}/>
        ) : (
        <EmailView email={openedEmail}/>
        )}
      </main>
    </div>
  )
}

export default App
