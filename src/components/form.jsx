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
                            placeholder={Termini[lang].nome}
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
                            placeholder={Termini[lang].cognome}
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
                        } placeholder={Termini[lang].azienda} type="text" name="azienda" id="azienda" />
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
                        } rows={6} placeholder={Termini[lang].messaggio} name="messaggio" id="messaggio" />
                        {errors.messaggio && <p>{errors.messaggio?.message}</p>}
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

                            <span>{Termini[lang].formPrivacyText1}<Link to="/privacy">{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>
                            {errors.contattiPrivacy && <p>{errors.contattiPrivacy?.message}</p>}
                        </label>
                    </div>

                    <input className='button-sezione' type="submit" />

                </div>

            </form>

        </div>
    )

}

const FormContatti = ({ lang }) => {
    const form = useForm({
        defaultValues: {
            candidatureNome: "",
            candidatureCognome: "",
            candidatureTelefono: "",
            contattiEmail: "",
            candidatureLinkedin: "",
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
                    <label htmlFor="candidatureNome">
                        <input
                            placeholder={Termini[lang].nome}
                            type="text"
                            name="nome"
                            id="candidatureNome"
                            {...register("candidatureNome", {
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
                        {errors.candidatureNome && <p>{errors.candidatureNome?.message}</p>}
                    </label>
                    <label htmlFor="candidatureCognome">
                        <input
                            placeholder={Termini[lang].cognome}
                            type="text"
                            name="cognome"
                            id="candidatureCognome"
                            {...register("candidatureCognome", {
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
                        {errors.candidatureCognome && <p>{errors.candidatureCognome?.message}</p>}
                    </label>
                </div>
                <div className="box-form">
                    <label htmlFor="candidatureTelefono">
                        <input placeholder={Termini[lang].azienda} type="text" name="azienda" id="candidatureTelefono"
                            {...register("candidatureTelefono", {
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
                        {errors.candidatureTelefono && <p>{errors.candidatureTelefono?.message}</p>}
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
                    <label htmlFor="candidatureLinkedin">
                        <textarea rows={6} placeholder={Termini[lang].messaggio} name="messaggio" id="candidatureLinkedin" {...register("candidatureLinkedin", {
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
                        {errors.candidatureLinkedin && <p>{errors.candidatureLinkedin?.message}</p>}
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
                    <span>{Termini[lang].formPrivacyText1}<Link to="/privacy">{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>
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


const FormDownloadCatalogo = ({ lang, setIsCatalogoVisible }) => {
    const form = useForm({
        defaultValues: {
            catalogoRichiesteNome: "",
            catalogoRichiesteCognome: "",
            catalogoRichiesteEmail: "",
            catalogoRichiestePrivacy: false
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
                data-netlify="true"
                name="catalogoRichieste"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit((data) => {

                    toast(Termini[lang].formSuccess)
                    fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "catalogoRichieste", ...data }),
                    })
                        .then(() => {
                            setIsCatalogoVisible(true)
                            reset()

                        })
                        .catch((error) => alert(error));
                })
                }>

                <input type="hidden" name="form-name" value="catalogoRichieste" />

                <div className="box-form">
                    <label htmlFor="catalogoRichiesteNome">
                        <input
                            placeholder={Termini[lang].nome}
                            type="text"
                            name="nome"
                            id="catalogoRichiesteNome"
                            {...register("catalogoRichiesteNome", {
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
                        {errors.catalogoRichiesteNome && <p>{errors.catalogoRichiesteNome?.message}</p>}
                    </label>
                    <label htmlFor="catalogoRichiesteCognome">
                        <input
                            placeholder={Termini[lang].cognome}
                            type="text"
                            name="cognome"
                            id="catalogoRichiesteCognome"
                            {...register("catalogoRichiesteCognome", {
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
                        {errors.catalogoRichiesteCognome && <p>{errors.catalogoRichiesteCognome?.message}</p>}
                    </label>
                </div>
                <div className="box-form">

                    <label htmlFor="catalogoRichiesteEmail">
                        <input placeholder="email" type="text" name="email" id="catalogoRichiesteEmail" {...register("catalogoRichiesteEmail", {
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
                        {errors.catalogoRichiesteEmail && <p>{errors.catalogoRichiesteEmail?.message}</p>}
                    </label>
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

                    <span>{Termini[lang].formPrivacyText1}<Link to="/privacy">{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>
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

const FormCandidature = ({ lang, candidature }) => {
    const form = useForm({
        defaultValues: {
            candidatureNome: "",
            candidatureCognome: "",
            candidatureTelefono: "",
            contattiEmail: "",
            candidatureLinkedin: "",
            candidatureCV: "",
            contattiPrivacy: false
        }
    })
    const { register, handleSubmit, formState, reset } = form
    const { errors } = formState

    console.log(candidature, 'candidature')
    //Funzione per l'enconding dei dati del form

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }



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
                    data-netlify="true"
                    name="contatti"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit((data) => {
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
                        <label htmlFor="candidatureNome">
                            <input
                                placeholder={Termini[lang].nome}
                                type="text"
                                name="nome"
                                id="candidatureNome"
                                {...register("candidatureNome", {
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
                            {errors.candidatureNome && <p>{errors.candidatureNome?.message}</p>}
                        </label>
                        <label htmlFor="candidatureCognome">
                            <input
                                placeholder={Termini[lang].cognome}
                                type="text"
                                name="cognome"
                                id="candidatureCognome"
                                {...register("candidatureCognome", {
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
                            {errors.candidatureCognome && <p>{errors.candidatureCognome?.message}</p>}
                        </label>
                    </div>
                    <div className="box-form">

                        <label htmlFor="contattiEmail">
                            <input placeholder="Email" type="text" name="email" id="contattiEmail" {...register("contattiEmail", {
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
                        <label htmlFor="candidatureTelefono">
                            <input placeholder={Termini[lang].formTelefono} type="text" name="telefono" id="candidatureTelefono"
                                {...register("candidatureTelefono", {
                                    pattern: {
                                        value: /^\+?[0-9\s\-()]{7,20}$/,
                                        message: Termini[lang].formTelefonoError
                                    }
                                })
                                } />
                            {errors.candidatureTelefono && <p>{errors.candidatureTelefono?.message}</p>}
                        </label>
                    </div>
                    <div className="box-form " >
                        <label htmlFor="candidatureLinkedin">
                            <input type="url" name="candidatureLinkedin" id="candidatureLinkedin" placeholder={Termini[lang].formLinkedin} {...register("candidatureLinkedin", {
                                pattern: {
                                    value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
                                    message: Termini[lang].formLinkedinError
                                }
                            })} />
                            {errors.candidatureLinkedin && <p>{errors.candidatureLinkedin?.message}</p>}
                        </label>
                    </div>

                    <label htmlFor="candidatureCV">
                        <div className="wrapper">
                            <div>{Termini[lang].formUploadText}</div>
                            <div>
                                <input type="file" id="candidatureCV" name="candidatureCV" accept=".pdf,.doc,.docx"
                                    {...register("candidatureCV", {
                                        validate: {
                                            fileSize: (value) => {
                                                if (value[0] && value[0].size > 2000000) {
                                                    return Termini[lang].formUpload + " (max 2MB)";
                                                }
                                                return true;
                                            },
                                            fileType: (value) => {
                                                if (value[0] && !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value[0].type)) {
                                                    return Termini[lang].formUpload + " ( PDF, DOC, DOCX)";
                                                }
                                                return true;
                                            }
                                        }
                                    })
                                    } />
                                {errors.candidatureCV && <p>{errors.candidatureCV?.message}</p>}
                            </div>
                        </div>
                    </label>

                    <div className="box-form">
                        <label htmlFor="candidature">
                            <div className="wrapper">
                                <div>{Termini[lang].formArea}</div>
                                <select name="candidature" id="candidature" {...register("candidature")} >
                                    {candidature && candidature.map((item, index) => {
                                        return (
                                            <option key={index} value={item.titolo}>{item.titolo}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </label>
                    </div>
                    <label className="privacy" htmlFor="candidaturePrivacy">
                        <input
                            type="checkbox"
                            placeholder="privacy"
                            name="privacy"
                            id="candidaturePrivacy"
                            {...register("candidaturePrivacy", {
                                required: {
                                    value: true,
                                    message: Termini[lang].formPrivacy
                                },
                            })}
                        />
                        <span>{Termini[lang].formPrivacyText1}<Link to="/privacy">{Termini[lang].formPrivacyText2}</Link>{Termini[lang].formPrivacyText3}</span>
                        {errors.contattiPrivacy && <p>{errors.contattiPrivacy?.message}</p>}
                    </label>
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