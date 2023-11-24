import React from "react";
import { Link } from 'gatsby';
import { useForm } from 'react-hook-form';

const FormFiere = ({ nomeEvento }) => {
    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }


    return (
        <div className="wrapper-form" >
            <form data-netlify="true"
                name="fiere"
                onSubmit={handleSubmit((data) => {
                    console.log(data, 'form data')

                    fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "fiere", "fiera": nomeEvento, ...data }),
                    })
                        .then(() => console.log("Form successfully submitted"))
                        .catch((error) => alert(error));
                })
                }>
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
                                    message: "Campo obbligatorio"
                                },
                            })
                            } />
                        {errors.nome && <p>{errors.nome?.message}</p>}
                    </label>
                    <label htmlFor="cognome">
                        <input
                            placeholder="cognome"
                            type="text"
                            name="url"
                            id="cognome"
                            {...register("cognome", {
                                required: {
                                    value: true,
                                    message: "Campo obbligatorio"
                                },
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
                                message: "Campo obbligatorio"
                            },
                        })
                        } placeholder="azienda" type="text" name="azienda" id="azienda" />
                        {errors.azienda && <p>{errors.azienda?.message}</p>}
                    </label>
                    <label htmlFor="email">
                        <input {...register("email", {
                            required: {
                                value: true,
                                message: "Campo obbligatorio"
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Formato password errato"
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
                                message: "Campo obbligatorio"
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
                                message: "Accetta le condizioni sulla Privacy"
                            },

                        })}
                    />
                    {errors.privacy && <p>{errors.privacy?.message}</p>}
                    <span>Accettazione della <Link to="/privacy"> Privacy</Link></span>
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

export { FormFiere }