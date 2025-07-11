import React from "react";
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';
import { Termini } from "../../data-translations";
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
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
const FormContatti = ({ lang }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(null);
    const WORKERURL = 'https://cf-form2mail.sistemi-fdb.workers.dev'
    /*     
     

    firstname,lastname,company,message,email */
    const formRef = React.useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const data = new FormData(form);

        try {
            // Crea FormData object

            // Aggiungi tutti i campi del form
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof File) {
                    data.append(key, value);
                } else if (Array.isArray(value)) {
                    // Per campi multipli (checkboxes)
                    value.forEach(item => data.append(`${key}[]`, item));
                } else if (value !== null && value !== undefined) {
                    data.append(key, value.toString());
                }
            });

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
                <label className="privacy" htmlFor="contattiPrivacy">
                    <input
                        type="checkbox"
                        name="privacy"
                        id="contattiPrivacy"
                        required
                    />

                    <span>{Termini[lang].formPrivacyText1}<Link to={`${linkToPrivacy[lang]}`}>{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>

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
            linkedin: "",
            cv: "",
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
                                required
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
                                    pattern: {
                                        value: /^\+?[0-9\s\-()]{7,20}$/,
                                        message: Termini[lang].formTelefonoError
                                    }
                                })
                                } />
                            {errors.phone && <p>{errors.phone?.message}</p>}
                        </div>

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