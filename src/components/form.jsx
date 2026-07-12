import React from "react";
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';
import { Termini } from "../../data-translations";
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import countryList from '../countries.json'
import 'react-toastify/dist/ReactToastify.css';

const linkToPrivacy = {
    it_IT: '/privacy',
    en_US: '/en/privacy'
}



const FormFiere = ({ nomeEvento, lang }) => {
    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            company: "",
            email: "",
            message: "",
            privacy: false
        }
    })
    const { register, handleSubmit, formState, reset } = form
    const { errors } = formState

    //Funzione per l'enconding dei dati del form
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const WORKERURL = 'https://cf-form2mail.sistemi-fdb.workers.dev'
    /*     
     

    firstname,lastname,company,message,email */
    const formRef = React.useRef();

    const formSubmit = async () => {
        const formData = new FormData(formRef.current);

        try {


            // Aggiungi token Turnstile se presente
            /*        if (turnstileToken) {
                       data.append('cf-turnstile-response', turnstileToken);
                   } */

            // Invia richiesta
            const response = await fetch(`${WORKERURL}/api/form/${'bacci-fiere'}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setResponse({
                    success: true,
                    message: result.message,
                    formId: result.formId
                });
                return { success: true, data: result };
            } else {
                const errorData = await response.json();
                setResponse({
                    success: false,
                    message: errorData.error || 'Errore sconosciuto'
                });
                return { success: false, error: errorData.error };
            }

        } catch (error) {
            const errorMessage = `Errore di rete: ${error.message}`;
            setResponse({
                success: false,
                message: errorMessage
            });
            return { success: false, error: errorMessage };
        } finally {
            setIsSubmitting(false);
            console.log(isSubmitting, response)
        }
    };



    return (
        <div className="wrapper-form" >
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark" />

            <form
                ref={formRef}
                name="fiere"

                onSubmit={handleSubmit((data) => {

                    data.nomeEvento = nomeEvento
                    toast(Termini[lang].formSuccess)
                    formSubmit().then(() => {
                        reset()
                        toast(Termini[lang].formSuccess)
                    })
                })
                }>
                <input style={{ display: 'none' }} type="text" id="nomeEvento" name="nomeEvento" defaultValue={nomeEvento} />
                <input type="hidden" name="form-name" defaultValue="fiere" />

                <div className="box-form">
                    <label htmlFor="nome">
                        <input
                            placeholder={Termini[lang].nome}
                            type="text"
                            name="firstname"
                            id="nome"

                            {...register("firstname", {
                                required: {
                                    value: true,
                                    message: Termini[lang].formRequired
                                },
                                minLength: {
                                    value: 3,
                                    message: Termini[lang].formMinimoCaratteri
                                }
                            })
                            } />
                        {errors.firstname && <p>{errors.firstname?.message}</p>}
                    </label>
                    <label htmlFor="cognome">
                        <input
                            placeholder={Termini[lang].cognome}
                            type="text"
                            name="lastname"
                            id="cognome"
                            {...register("lastname", {
                                required: {

                                    value: true,
                                    message: Termini[lang].formRequired
                                },
                                minLength: {
                                    value: 3,
                                    message: Termini[lang].formMinimoCaratteri
                                }
                            })
                            } />
                        {errors.lastname && <p>{errors.lastname?.message}</p>}
                    </label>
                </div>
                <div className="box-form">
                    <label htmlFor="azienda">
                        <input {...register("company", {
                            required: {
                                value: true,
                                message: Termini[lang].formRequired
                            },
                            minLength: {
                                value: 3,
                                message: Termini[lang].formMinimoCaratteri
                            }
                        })
                        } placeholder={Termini[lang].azienda} type="text" id="azienda" />
                        {errors.company && <p>{errors.company?.message}</p>}
                    </label>
                    <label htmlFor="email">
                        <input {...register("email", {
                            required: {
                                value: true,
                                message: Termini[lang].formRequired
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: Termini[lang].formMail
                            }
                        })
                        } placeholder="email" type="text" id="email" />
                        {errors.email && <p>{errors.email?.message}</p>}
                    </label>
                </div>
                <div className="box-form-message">
                    <label htmlFor="messaggio">
                        <textarea {...register("message", {
                            required: {
                                value: true,
                                message: Termini[lang].formRequired
                            },
                            minLength: {
                                value: 3,
                                message: Termini[lang].formMessaggio
                            }
                        })
                        } rows={6} placeholder={Termini[lang].messaggio} id="messaggio" />
                        {errors.message && <p>{errors.message?.message}</p>}
                    </label>
                </div>

                <div className="box-submit">
                    <div className="accept">
                        <label className="privacy" htmlFor="privacy">
                            <input
                                type="checkbox"
                                placeholder="privacy"
                                name="privacy"
                                id="privacy"
                                {...register("privacy", {
                                    required: {
                                        value: true,
                                        message: Termini[lang].formPrivacy
                                    },

                                })}
                            />

                            <span>{Termini[lang].formPrivacyText1}<Link to={`${linkToPrivacy[lang]}`}>{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>
                            {errors.privacy && <p>{errors.privacy?.message}</p>}
                        </label>
                    </div>

                    <input className='button-sezione' type="submit" />

                </div>

            </form>

        </div>
    )

}
const FormContatti = ({ lang, machines }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const WORKERURL = 'https://cf-form2mail.sistemi-fdb.workers.dev'
    /*     firstname,lastname,company,message,email */
    console.log(isSubmitting, response)
    const formRef = React.useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const data = new FormData(form);

        try {
            // Crea FormData object
            // Aggiungi tutti i campi del form

            console.log('Form data entries:');
            for (let [key, value] of data.entries()) {
                console.log(key, value);
            }
            // Aggiungi token Turnstile se presente
            /*        if (turnstileToken) {
                       data.append('cf-turnstile-response', turnstileToken);
                   } */

            // Invia richiesta
            const response = await fetch(`${WORKERURL}/api/form/${'bacci-contatti'}`, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                setResponse({
                    success: true,
                    message: result.message,
                    formId: result.formId
                });
                toast(Termini[lang].formSuccess);
                form.reset(); // Reset the form after successful submission
                return { success: true, data: result };
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Errore sconosciuto');
                setResponse({
                    success: false,
                    message: errorData.error || 'Errore sconosciuto'
                });
                return { success: false, error: errorData.error };
            }

        } catch (error) {
            const errorMessage = `Errore di rete: ${error.message}`;
            setResponse({
                success: false,
                message: errorMessage
            });
            return { success: false, error: errorMessage };
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="wrapper-form">
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark"
            />

            <form
                ref={formRef}
                name="contatti"
                method="POST"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >


                <div className="box-form">
                    <label htmlFor="contattiNome" style={{ display: 'none' }}>nome</label>
                    <input
                        placeholder={Termini[lang].nome}
                        type="text"
                        name="firstname"
                        id="contattiNome"
                        minLength={3}
                        required
                    />

                    <label htmlFor="contattiCognome" style={{ display: 'none' }}> cognome </label>
                    <input
                        placeholder={Termini[lang].cognome}
                        type="text"
                        name="lastname"
                        id="contattiCognome"
                        minLength={3}
                        required
                    />

                </div>
                <div className="box-form">
                    <label htmlFor="contattiAzienda" style={{ display: 'none' }}>azienda</label>
                    <input
                        placeholder={Termini[lang].azienda}
                        type="text"
                        name="company"
                        id="contattiAzienda"
                        minLength={3}
                        required
                    />

                    <label htmlFor="contattiEmail" style={{ display: 'none' }}>email</label>
                    <input
                        placeholder="email"
                        type="email"
                        name="email"
                        id="contattiEmail"
                        required
                    />


                </div>
                <div className="box-form nazione-select">
                    <label htmlFor="telefono" style={{ display: 'none' }}>telefono</label>
                    <input type="tel" id="telefono" name="telefono" placeholder={Termini[lang].formTelefono} required />
                    <label htmlFor="contattiNazione" style={{ display: 'none' }}>nazione</label>
                    <select className="countrySelect" name="country" id="contattiNazione" required>
                        <option value="">{lang === 'it_IT' ? 'Seleziona nazione' : 'Select country'}</option>
                        {countryList.map((country) => (
                            <option key={country.value} value={country.value}>
                                {country.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="box-form">
                    {machines && machines.length && <>
                        <label htmlFor="contattiOggetto" style={{ display: 'none' }}>oggetto</label>
                        <select name="macchine" id="contattiOggetto" >
                            <option value="">{Termini[lang].formListaMacchine}</option>
                            {machines?.length > 0 && machines.map((machine, index) => (
                                <option key={index} value={machine.name}>{machine.name}</option>
                            ))}
                        </select>
                    </>}
                    <label htmlFor="website" style={{ display: 'none' }}>Website</label>
                    <input type="tel" id="website" name="website" placeholder={Termini[lang].formSite} />
                </div>
                <div className="box-form-message">
                    <label htmlFor="contattiMessaggio" style={{ display: 'none' }}>
                        messaggio
                    </label>
                    <textarea
                        rows={6}
                        placeholder={Termini[lang].messaggio}
                        name="message"
                        id="contattiMessaggio"
                        minLength={3}
                        required
                    />

                </div>
        
                <label className="privacy" htmlFor="marketing">
                    <input
                        type="checkbox"
                        name="marketing"
                        id="marketing"
                        required
                    />

                    <span>{Termini[lang].formMarketing} - <Link to={`${linkToPrivacy[lang]}`}>{Termini[lang].formPrivacyText2}</Link></span>

                </label>
                        <label className="privacy" htmlFor="customer">
                    <input
                        type="checkbox"
                        name="customer"
                        id="customer"
                        required
                    />

                    <span>{Termini[lang].formCustomer} - <Link to={`${linkToPrivacy[lang]}`}> {Termini[lang].formPrivacyText2}</Link></span>

                </label>
                <div className="box-submit">
                    <label htmlFor="submit">
                        <input
                            className="button-sezione"
                            type="submit"
                            value={Termini[lang].invia}
                        />
                    </label>
                </div>
            </form>
        </div>
    );
};


const FormDownloadCatalogo = ({ lang, setIsCatalogoVisible }) => {
    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            privacy: false
        }
    })

    const { register, handleSubmit, formState, reset } = form
    const { errors } = formState

    //Funzione per l'enconding dei dati del form
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const WORKERURL = 'https://cf-form2mail.sistemi-fdb.workers.dev'
    console.log(isSubmitting, response)
    /*     
     

    firstname,lastname,company,message,email */
    const formRef = React.useRef();

    const formSubmit = async () => {
        const formData = new FormData(formRef.current);

        try {


            // Aggiungi token Turnstile se presente
            /*        if (turnstileToken) {
                       data.append('cf-turnstile-response', turnstileToken);
                   } */

            // Invia richiesta
            const response = await fetch(`${WORKERURL}/api/form/${'bacci-catalogo'}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setResponse({
                    success: true,
                    message: result.message,
                    formId: result.formId
                });
                return { success: true, data: result };
            } else {
                const errorData = await response.json();
                setResponse({
                    success: false,
                    message: errorData.error || 'Errore sconosciuto'
                });
                return { success: false, error: errorData.error };
            }

        } catch (error) {
            const errorMessage = `Errore di rete: ${error.message}`;
            setResponse({
                success: false,
                message: errorMessage
            });
            return { success: false, error: errorMessage };
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="wrapper-form downloadCatalogo" >
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark" />

            <form
                name="catalogoRichieste"
                ref={formRef}
                onSubmit={handleSubmit(() => {
                    formSubmit().then(() => {
                        toast(Termini[lang].formSuccess);
                        setIsCatalogoVisible(true);
                        reset();

                    })
                })
                }>

                <input type="hidden" name="form-name" value="catalogoRichieste" />

                <div className="box-form">
                    <div className="boxinput">
                        <label htmlFor="catalogoRichiesteNome" style={{ display: 'none' }}>nome</label>
                        <input
                            placeholder={Termini[lang].nome}
                            type="text"
                            name="firstname"
                            id="catalogoRichiesteNome"
                            {...register("firstname", {
                                required: {
                                    value: true,
                                    message: Termini[lang].formRequired
                                },
                                minLength: {
                                    value: 3,
                                    message: Termini[lang].formMinimoCaratteri
                                }
                            })
                            } />
                        {errors.firstname && <p>{errors.firstname?.message}</p>}
                    </div>

                    <div className="boxinput">
                        <label htmlFor="catalogoRichiesteCognome" style={{ display: 'none' }}>cognome</label>
                        <input
                            placeholder={Termini[lang].cognome}
                            type="text"
                            name="lastname"
                            id="catalogoRichiesteCognome"
                            {...register("lastname", {
                                required: {
                                    value: true,
                                    message: Termini[lang].formRequired
                                },
                                minLength: {
                                    value: 3,
                                    message: Termini[lang].formMinimoCaratteri
                                }
                            })
                            } />
                        {errors.lastname && <p>{errors.lastname?.message}</p>}
                    </div>

                </div>
                <div className="box-form">

                    <div className="boxinput">
                        <label htmlFor="catalogoRichiesteEmail" style={{ display: 'none' }}>email</label>
                        <input placeholder="email" type="text" name="email" id="catalogoRichiesteEmail" {...register("email", {
                            required: {
                                value: true,
                                message: Termini[lang].formRequired
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: Termini[lang].formMail
                            }
                        })
                        } />
                        {errors.email && <p>{errors.email?.message}</p>}
                    </div>
                </div>

                <label className="privacy" htmlFor="catalogoRichiestePrivacy">
                    <input
                        type="checkbox"
                        placeholder="privacy"
                        name="privacy"
                        id="catalogoRichiestePrivacy"
                        {...register("catalogoRichiestePrivacy", {
                            required: {
                                value: true,
                                message: Termini[lang].formPrivacy
                            },
                        })}
                    />

                    <span>{Termini[lang].formPrivacyText1}<Link to={`${linkToPrivacy[lang]}`}>{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>
                    {errors.privacy && <p>{errors.privacy?.message}</p>}
                </label>
                <div className="box-submit">
                    <label htmlFor="submit">
                        <input className='button-sezione' type="submit" value={Termini[lang].invia} />
                    </label>
                </div>

            </form>

        </div>
    )

}

const FormCandidature = ({ lang, candidature }) => {

    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            commenti: "",
            linkedin: "",
            cv: "",
            privacy: false
        }
    })
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    //Funzione per l'enconding dei dati del form
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const WORKERURL = 'https://cf-form2mail.sistemi-fdb.workers.dev'
    console.log(isSubmitting, response)
    /*     
     

    firstname,lastname,company,message,email */
    const formRef = React.useRef();

    const formSubmit = async () => {
        const formData = new FormData(formRef.current);

        try {


            // Aggiungi token Turnstile se presente
            /*        if (turnstileToken) {
                       data.append('cf-turnstile-response', turnstileToken);
                   } */

            // Invia richiesta
            const response = await fetch(`${WORKERURL}/api/form/${'bacci-candidature'}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setResponse({
                    success: true,
                    message: result.message,
                    formId: result.formId
                });
                return { success: true, data: result };
            } else {
                const errorData = await response.json();
                setResponse({
                    success: false,
                    message: errorData.error || 'Errore sconosciuto'
                });
                return { success: false, error: errorData.error };
            }

        } catch (error) {
            const errorMessage = `Errore di rete: ${error.message}`;
            setResponse({
                success: false,
                message: errorMessage
            });
            return { success: false, error: errorMessage };
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="wrapper-candidature">
            <div className="wrapper-form" >
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="dark" />
                <form
                    encType="multipart/form-data"
                    name="candidature"
                    ref={formRef}
                    onSubmit={handleSubmit((data) => {
                        toast(Termini[lang].formSuccess)
                        formSubmit(data)
                    })
                    }>


                    <div className="box-form">
                        <div className="boxinput">
                            <label htmlFor="candidatureNome" style={{ display: 'none' }}>nome</label>
                            <input
                                placeholder={Termini[lang].nome}
                                type="text"
                                id="candidatureNome"

                                {...register("firstname", {
                                    required: {
                                        value: true,
                                        message: Termini[lang].formRequired
                                    },
                                    minLength: {
                                        value: 3,
                                        message: Termini[lang].formMinimoCaratteri
                                    }
                                })
                                } />
                            {errors.firstname && <p>{errors.firstname?.message}</p>}
                        </div>
                        <div className="boxinput">

                            <label htmlFor="cognome" style={{ display: 'none' }}>cognome</label>
                            <input
                                placeholder={Termini[lang].cognome}
                                type="text"
                                id="cognome"
                                {...register("lastname", {
                                    required: {
                                        value: true,
                                        message: Termini[lang].formRequired
                                    },
                                    minLength: {
                                        value: 3,
                                        message: Termini[lang].formMinimoCaratteri
                                    }
                                })
                                } />
                            {errors.lastname && <p>{errors.lastname?.message}</p>}
                        </div>

                    </div>
                    <div className="box-form">

                        <div className="boxinput">
                            <label htmlFor="candidatureEmail" style={{ display: 'none' }}>email</label>
                            <input placeholder="Email" type="text" id="candidatureEmail"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: Termini[lang].formRequired
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: Termini[lang].formMail
                                    }
                                })
                                } />
                            {errors.email && <p>{errors.email?.message}</p>}
                        </div>

                        <div className="boxinput">
                            <label htmlFor="candidatureTelefono" style={{ display: 'none' }}>telefono</label>
                            <input placeholder={Termini[lang].formTelefono} type="text" id="candidatureTelefono"
                                {...register("phone", {
                                    required: {
                                        value: false
                                    },
                                    pattern: {
                                        value: /^\+?[0-9\s\-()]{7,20}$/,
                                        message: Termini[lang].formTelefonoError
                                    }
                                })
                                } />
                            {errors.phone && <p>{errors.phone?.message}</p>}
                        </div>

                    </div>
                    <div className="box-form">
                        <label htmlFor="commenti" className="commenti" style={{ display: 'none' }}>Commenti</label>
                        <textarea style={{ height: '100px' }} rows={6} id="commenti" placeholder={Termini[lang].formCommenti} {...register("commenti",
                            {
                                required: { value: false },
                                minLength: {
                                    value: 10,
                                    message: Termini[lang].formMessageMinimoCaratteri
                                }
                            }
                        )} />
                        {errors.commenti && <p>{errors.commenti?.message}</p>}
                    </div>
                    <div className="box-form " >
                        <div className="boxinput linkedin">
                            <label htmlFor="candidatureLinkedin" style={{ display: 'none' }}>linkedin</label>
                            <input type="url" name="linkedin" id="candidatureLinkedin" placeholder={Termini[lang].formLinkedin} {...register("linkedin", {
                                pattern: {
                                    value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
                                    message: Termini[lang].formLinkedinError
                                }
                            })} />
                            {errors.linkedin && <p>{errors.linkedin?.message}</p>}
                        </div>
                    </div>
                    <div className="box-form">
                        <div className="boxinput">
                            <label htmlFor="candidatureCV" style={{ display: 'none' }}>cv</label>
                            <div className="wrapper">
                                <div>{Termini[lang].formUploadText}</div>
                                <div>
                                    <input type="file" id="candidatureCV"
                                        accept=".pdf,.doc,.docx"
                                        name="cv" />
                                    {errors.cv && <p>{errors.cv?.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-form">
                        <div className="boxinput">
                            <label htmlFor="candidature" style={{ display: 'none' }}>candidatura</label>
                            <div className="wrapper">
                                <div>{Termini[lang].formArea}</div>
                                <select name="position" id="candidature" {...register("position")} >
                                    {candidature && candidature.map((item, index) => {
                                        return (
                                            <option key={index} value={item.titolo}>{item.titolo}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="boxinput privacy">
                        <label className="privacy" htmlFor="privacy" style={{ display: 'none' }}>privacy</label>
                        <input
                            type="checkbox"
                            placeholder="privacy"
                            name="privacy"
                            id="privacy"
                            {...register("privacy", {
                                required: {
                                    value: true,
                                    message: Termini[lang].formPrivacy
                                },
                            })}
                        />
                        <span>{Termini[lang].formPrivacyText1}<Link to={`${linkToPrivacy[lang]}`}>{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>
                        {errors.privacy && <p>{errors.privacy?.message}</p>}
                    </div>

                    <div className="box-submit">
                        <label htmlFor="submit">
                            <input className='button-sezione' type="submit" value={Termini[lang].invia} />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )

}
export { FormFiere, FormContatti, FormDownloadCatalogo, FormCandidature }