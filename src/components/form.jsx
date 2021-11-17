import React from "react";
import { Link } from 'gatsby';

const FormFiere = () => {


    return (
        <div className="wrapper-form" >
            <form method="POST" name="fiere" action="/thanks" netlify-honeypot="bot-field" data-netlify="true">
                <input type="hidden" name="form-name" value="fiere" />
                <div className="box-form">
                    <label htmlFor="nome">
                        <input placeholder="nome" type="text" name="nome" id="nome" required />
                    </label>
                    <label htmlFor="cognome">
                        <input placeholder="cognome" type="url" name="url" id="cognome" />
                    </label>
                </div>
                <div className="box-form">
                    <label htmlFor="azienda">
                        <input placeholder="azienda" type="text" name="azienda" id="azienda" required />
                    </label>
                    <label htmlFor="email">
                        <input placeholder="email" type="text" name="email" id="email" required />
                    </label>
                </div>
                <div className="box-form-message">
                    <label htmlFor="messaggio">
                        <textarea rows={6} placeholder="messaggio" name="messaggio" id="messaggio" required />
                    </label>
                </div>
                <label htmlFor="privacy">
                    <input type="checkbox" placeholder="privacy" name="privacy" id="privacy" required />
                    <span>Accettazione della <Link to="/privacy"> Privacy</Link></span>
                </label>
                <div className="box-submit">
                    <label htmlFor="submit">
                        <input className='button-sezione' type="submit" value="invia" name="submit" />
                    </label>
                </div>

            </form>

        </div>
    )

}

export default FormFiere