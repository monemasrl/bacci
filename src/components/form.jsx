import React from "react";
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';
import { Termini } from "../../data-translations";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const linkToPrivacy = {
    it_IT: '/privacy',
    en_US: '/en/privacy'
}

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
                <input style={{ display: 'none' }} type="text" id="nomeEvento" name="nomeEvento" defaultValue={nomeEvento} />
                <input type="hidden" name="form-name" defaultValue="fiere" />

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
    const formRef = React.useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const data = new FormData(form);

        try {
            await fetch("/", {
                method: "POST",
                body: data,
            });
            toast.success("Messaggio inviato con successo!");
            form.reset();
        } catch (error) {
            toast.error("Errore nell'invio del messaggio.");
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
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="form-name" value="contatti" />
                <input type="hidden" name="bot-field" />

                <div className="box-form">
                    <label htmlFor="contattiNome" style={{ display: 'none' }}>nome</label>
                    <input
                        placeholder={Termini[lang].nome}
                        type="text"
                        name="nome"
                        id="contattiNome"
                        minLength={3}
                        required
                    />

                    <label htmlFor="contattiCognome" style={{ display: 'none' }}> cognome </label>
                    <input
                        placeholder={Termini[lang].cognome}
                        type="text"
                        name="cognome"
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
                        name="azienda"
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
                        pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"
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
                        name="messaggio"
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
                    <label htmlFor="catalogoRichiesteNome" style={{ display: 'none' }}>nome</label>
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

                    <label htmlFor="catalogoRichiesteCognome" style={{ display: 'none' }}>cognome</label>
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

                </div>
                <div className="box-form">

                    <label htmlFor="catalogoRichiesteEmail" style={{ display: 'none' }}>email</label>
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
                    {errors.catalogoRichiestePrivacy && <p>{errors.catalogoRichiestePrivacy?.message}</p>}
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
            nome: "",
            cognome: "",
            telefono: "",
            email: "",
            linkedin: "",
            CV: "",
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
                    name="candidature"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit((data) => {
                        toast(Termini[lang].formSuccess)

                        fetch("/", {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: encode({ "form-name": "candidature", ...data }),
                        })
                            .then(() => {

                                reset()

                            })
                            .catch((error) => alert(error));
                    })
                    }>

                    <input type="hidden" name="form-name" value="candidature" />
                    <div className="box-form">
                        <div className="boxinput">
                            <label htmlFor="candidatureNome" style={{ display: 'none' }}>nome</label>
                            <input
                                placeholder={Termini[lang].nome}
                                type="text"
                                name="nome"
                                id="candidatureNome"
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
                        </div>
                        <div className="boxinput">

                            <label htmlFor="cognome" style={{ display: 'none' }}>cognome</label>
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
                        </div>

                    </div>
                    <div className="box-form">

                        <div className="boxinput">
                            <label htmlFor="candidatureEmail" style={{ display: 'none' }}>email</label>
                            <input placeholder="Email" type="text" name="email" id="candidatureEmail"
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
                            <input placeholder={Termini[lang].formTelefono} type="text" name="telefono" id="candidatureTelefono"
                                {...register("telefono", {
                                    pattern: {
                                        value: /^\+?[0-9\s\-()]{7,20}$/,
                                        message: Termini[lang].formTelefonoError
                                    }
                                })
                                } />
                            {errors.telefono && <p>{errors.telefono?.message}</p>}
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
                                    <input type="file" id="candidatureCV" name="CV" accept=".pdf,.doc,.docx"
                                        {...register("CV", {
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
                                    {errors.CV && <p>{errors.CV?.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-form">
                        <div className="boxinput">
                            <label htmlFor="candidature" style={{ display: 'none' }}>candidatura</label>
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
                        {errors.candidaturePrivacy && <p>{errors.candidaturePrivacy?.message}</p>}
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