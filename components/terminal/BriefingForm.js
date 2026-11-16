import { useEffect, useState } from "react";

const BriefingForm = ({ preselectedSubject }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: preselectedSubject || "Investor Briefing",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    submitted: false,
    error: false,
  });

  useEffect(() => {
    if (preselectedSubject) {
      setFormData((prev) => ({ ...prev, subject: preselectedSubject }));
    }
  }, [preselectedSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, submitted: false, error: false });

    try {
      const body = new URLSearchParams();
      body.append("form-name", "contact");
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("company", formData.company);
      body.append("phone", "");
      body.append("subject", formData.subject);
      body.append("message", formData.message);

      const res = await fetch("/forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus({ loading: false, submitted: true, error: false });
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "Investor Briefing",
        message: "",
      });
    } catch (err) {
      setStatus({ loading: false, submitted: false, error: true });
    }
  };

  return (
    <section id="access" className="access-section">
      <div className="tmx-container">
        <div className="section-kicker">02 // INQUIRE</div>

        <div className="access-grid">
          <div className="direct-lines">
            <div className="line-item">
              <span className="line-label">BASE</span>
              <span className="line-value">Boulder, CO</span>
            </div>
            <div className="line-item">
              <span className="line-label">EMAIL</span>
              <a href="mailto:inbox@terpmetrix.com" className="line-value link">
                inbox@terpmetrix.com
              </a>
            </div>
            <div className="line-item">
              <span className="line-label">PHONE</span>
              <a href="tel:+13015254028" className="line-value link">
                (301) 525-4028
              </a>
            </div>
          </div>

          <div className="form-box">
            {status.submitted ? (
              <div className="submitted-state">
                <div className="submitted-badge">[ RECEIVED ]</div>
                <p>Inquiry logged. We will respond directly.</p>
                <button
                  type="button"
                  className="submit-btn"
                  onClick={() =>
                    setStatus({ loading: false, submitted: false, error: false })
                  }
                >
                  NEW MESSAGE
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                name="contact"
                data-netlify="true"
                className="tmx-form"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <input name="bot-field" onChange={() => {}} />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="tmx-name">NAME *</label>
                    <input
                      id="tmx-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="tmx-email">EMAIL *</label>
                    <input
                      id="tmx-email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@firm.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="tmx-company">ORGANIZATION</label>
                    <input
                      id="tmx-company"
                      name="company"
                      type="text"
                      placeholder="Optional"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="tmx-subject">TOPIC *</label>
                    <select
                      id="tmx-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="Investor Briefing">Investor Briefing</option>
                      <option value="Partnership">Partnership</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="tmx-message">MESSAGE *</label>
                  <textarea
                    id="tmx-message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Brief note..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {status.error && (
                  <div className="error-note">
                    Unable to send right now. Email inbox@terpmetrix.com.
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status.loading}
                >
                  {status.loading ? "SENDING..." : "SEND →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .access-section {
          padding: 68px 0 80px;
        }

        .section-kicker {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--text-dim);
          margin-bottom: 20px;
        }

        .access-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
          gap: 44px;
          align-items: start;
        }

        .direct-lines {
          border-top: 1px solid var(--border-line);
        }

        .line-item {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-line);
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .line-label {
          color: var(--text-dim);
          letter-spacing: 0.1em;
        }

        .line-value {
          color: var(--text-white);
        }

        .line-value.link:hover {
          text-decoration: underline;
        }

        .form-box {
          border: 1px solid var(--border-line);
          background: var(--bg-panel);
        }

        .tmx-form {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--text-dim);
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          background: var(--bg-void);
          border: 1px solid var(--border-line);
          color: var(--text-white);
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 11px 12px;
          outline: none;
          transition: border-color 0.2s ease;
          border-radius: 0;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: #4b525c;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #ffffff;
        }

        .submit-btn {
          align-self: flex-start;
          background: #ffffff;
          color: #050506;
          border: 1px solid #ffffff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: #d8dde6;
          border-color: #d8dde6;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .error-note {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #e5e7eb;
          border: 1px solid var(--border-strong);
          padding: 10px 12px;
        }

        .submitted-state {
          padding: 36px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-start;
        }

        .submitted-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          padding: 4px 10px;
          border: 1px solid var(--border-strong);
          color: #ffffff;
        }

        .submitted-state p {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-silver);
          margin: 0;
        }

        @media (max-width: 860px) {
          .access-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 580px) {
          .field-row {
            grid-template-columns: 1fr;
          }

          .submit-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default BriefingForm;
