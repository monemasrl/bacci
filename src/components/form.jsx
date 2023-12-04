import React from "react";
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';
import { Termini } from "../../data-translations";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormFiere = ({ nomeEvento, lang }) => {
    const form = useForm({
        defaultValues: {
            nome: "",
            cognome: "",
            azienda: "",
            email: "",
            messaggio: "",
            privacy: false
        }
    })
    const { register, handleSubmit, formState, reset } = form
    const { errors } = formState


    //Funzione per l'enconding dei dati del form

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }


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
                data-netlify="true"
                name="fiere"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit((data) => {

                    data.nomeEvento = nomeEvento
                    toast(Termini[lang].formSuccess)
                    fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "fiere", ...data }),
                    })
                        .then(() => {
                            reset()

                        })
                        .catch((error) => alert(error));
                })
                }>
                <input style={{ display: 'none' }} type="text" id="nomeEvento" name="nomeEvento" value={nomeEvento} />
                <input type="hidden" name="form-name" value="fiere" />

                <div className="box-form">
                    <label htmlFor="nome">
                        <input
                            placeholder="nome"
                            type="text"
                            name="nome"
                            id="nome"
                            {...register("nome", {
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
                        {errors.nome && <p>{errors.nome?.message}</p>}
                    </label>
                    <label htmlFor="cognome">
                        <input
                            placeholder="cognome"
                            type="text"
                            name="cognome"
                            id="cognome"
                            {...register("cognome", {
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
                        {errors.cognome && <p>{errors.cognome?.message}</p>}
                    </label>
                </div>
                <div className="box-form">
                    <label htmlFor="azienda">
                        <input {...register("azienda", {
                            required: {
                                value: true,
                                message: Termini[lang].formRequired
                            },
                            minLength: {
                                value: 3,
                                message: Termini[lang].formMinimoCaratteri
                            }
                        })
                        } placeholder="azienda" type="text" name="azienda" id="azienda" />
                        {errors.azienda && <p>{errors.azienda?.message}</p>}
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
                        } placeholder="email" type="text" name="email" id="email" />
                        {errors.email && <p>{errors.email?.message}</p>}
                    </label>
                </div>
                <div className="box-form-message">
                    <label htmlFor="messaggio">
                        <textarea {...register("messaggio", {
                            required: {
                                value: true,
                                message: Termini[lang].formRequired
                            },
                            minLength: {
                                value: 3,
                                message: Termini[lang].formMessaggio
                            }
                        })
                        } rows={6} placeholder="messaggio" name="messaggio" id="messaggio" />
                        {errors.messaggio && <p>{errors.messaggio?.message}</p>}
                    </label>
                </div>
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

                    <span>{Termini[lang].formPrivacy} <Link to="/privacy"> Privacy</Link></span>
                    {errors.privacy && <p>{errors.privacy?.message}</p>}
                </label>
                <div className="box-submit">
                    <label htmlFor="submit">
                        <input className='button-sezione' type="submit" />
                    </label>
                </div>

            </form>

        </div>
    )

}

const FormContatti = ({ lang }) => {
    const form = useForm({
        defaultValues: {
            contattiNome: "",
            contattiCognome: "",
            contattiAzienda: "",
            contattiEmail: "",
            contattiMessaggio: "",
            contattiPrivacy: false
        }
    })
    const { register, handleSubmit, formState, reset } = form
    const { errors } = formState


    //Funzione per l'enconding dei dati del form

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }


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
                data-netlify="true"
                name="contatti"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit((data) => {
                    console.log(data, 'form data')
                    toast(Termini[lang].formSuccess)
                    fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "contatti", ...data }),
                    })
                        .then(() => {
                            reset()

                        })
                        .catch((error) => alert(error));
                })
                }>

                <input type="hidden" name="form-name" value="contatti" />

                <div className="box-form">
                    <label htmlFor="contattiNome">
                        <input
                            placeholder="nome"
                            type="text"
                            name="nome"
                            id="contattiNome"
                            {...register("contattiNome", {
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
                        {errors.contattiNome && <p>{errors.contattiNome?.message}</p>}
                    </label>
                    <label htmlFor="contattiCognome">
                        <input
                            placeholder="cognome"
                            type="text"
                            name="cognome"
                            id="contattiCognome"
                            {...register("contattiCognome", {
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
                        {errors.contattiCognome && <p>{errors.contattiCognome?.message}</p>}
                    </label>
                </div>
                <div className="box-form">
                    <label htmlFor="contattiAzienda">
                        <input placeholder="azienda" type="text" name="azienda" id="contattiAzienda"
                            {...register("contattiAzienda", {
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
                        {errors.contattiAzienda && <p>{errors.contattiAzienda?.message}</p>}
                    </label>
                    <label htmlFor="contattiEmail">
                        <input placeholder="email" type="text" name="email" id="contattiEmail" {...register("contattiEmail", {
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
                        {errors.contattiEmail && <p>{errors.contattiEmail?.message}</p>}
                    </label>
                </div>
                <div className="box-form-message">
                    <label htmlFor="contattiMessaggio">
                        <textarea rows={6} placeholder="messaggio" name="messaggio" id="contattiMessaggio" {...register("contattiMessaggio", {
                            required: {
                                value: true,
                                message: Termini[lang].formRequired
                            },
                            minLength: {
                                value: 3,
                                message: Termini[lang].formMessaggio
                            }
                        })
                        } />
                        {errors.contattiMessaggio && <p>{errors.contattiMessaggio?.message}</p>}
                    </label>
                </div>
                <label className="privacy" htmlFor="contattiPrivacy">
                    <input
                        type="checkbox"
                        placeholder="privacy"
                        name="privacy"
                        id="contattiPrivacy"
                        {...register("contattiPrivacy", {
                            required: {
                                value: true,
                                message: Termini[lang].formPrivacy
                            },

                        })}
                    />

                    <span>{Termini[lang].formPrivacy}<Link to="/privacy"> Privacy</Link></span>
                    {errors.contattiPrivacy && <p>{errors.contattiPrivacy?.message}</p>}
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


export { FormFiere, FormContatti }