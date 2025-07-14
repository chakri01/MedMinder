import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [medications, setMedications] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMed, setNewMed] = useState({ name: '', dose: '', time: '' })
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Load medications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('medications')
    if (saved) {
      setMedications(JSON.parse(saved))
    }
  }, [])

  // Save medications to localStorage
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications))
  }, [medications])

  const addMedication = () => {
    if (newMed.name && newMed.dose && newMed.time) {
      setMedications([...medications, { ...newMed, id: Date.now() }])
      setNewMed({ name: '', dose: '', time: '' })
      setShowAddForm(false)
    }
  }

  const removeMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id))
  }

  const getMedicationStatus = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    const medTime = new Date()
    medTime.setHours(hours, minutes, 0, 0)
    
    const now = new Date()
    const diffMinutes = (now - medTime) / (1000 * 60)
    
    if (diffMinutes > 30) return 'overdue'
    if (diffMinutes > -30) return 'due'
    return 'upcoming'
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="app">
      <header className="header">
        <h1>💊 MedMinder</h1>
        <p>Your medication reminder assistant</p>
      </header>

      <main className="main">
        <section className="today-schedule">
          <h2>Today's Schedule</h2>
          {medications.length === 0 ? (
            <div className="empty-state">
              <p>No medications scheduled</p>
              <button onClick={() => setShowAddForm(true)} className="btn-primary">
                Add Your First Medication
              </button>
            </div>
          ) : (
            <div className="medication-list">
              {medications.map(med => {
                const status = getMedicationStatus(med.time)
                return (
                  <div key={med.id} className={`medication-card ${status}`}>
                    <div className="med-info">
                      <h3>{med.name}</h3>
                      <p>{med.dose}</p>
                      <span className="time">{formatTime(med.time)}</span>
                    </div>
                    <div className="med-actions">
                      <span className={`status-badge ${status}`}>
                        {status === 'overdue' ? '⚠️ Overdue' : 
                         status === 'due' ? '🔔 Due Now' : '⏰ Upcoming'}
                      </span>
                      <button 
                        onClick={() => removeMedication(med.id)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {!showAddForm && medications.length > 0 && (
          <button 
            onClick={() => setShowAddForm(true)} 
            className="btn-add"
          >
            + Add Medication
          </button>
        )}

        {showAddForm && (
          <section className="add-form">
            <h3>Add New Medication</h3>
            <div className="form-group">
              <label>Medication Name</label>
              <input
                type="text"
                value={newMed.name}
                onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                placeholder="e.g., Aspirin"
              />
            </div>
            <div className="form-group">
              <label>Dose</label>
              <input
                type="text"
                value={newMed.dose}
                onChange={(e) => setNewMed({...newMed, dose: e.target.value})}
                placeholder="e.g., 100mg"
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={newMed.time}
                onChange={(e) => setNewMed({...newMed, time: e.target.value})}
              />
            </div>
            <div className="form-actions">
              <button onClick={addMedication} className="btn-primary">
                Add Medication
              </button>
              <button 
                onClick={() => setShowAddForm(false)} 
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Current time: {currentTime.toLocaleTimeString()}</p>
      </footer>
    </div>
  )
}

export default App