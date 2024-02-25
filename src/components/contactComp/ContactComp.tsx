import styles from './_ContactComp.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios'
import { IContactData } from '../../interfaces/ContactInterfaces';
import { selectLangState } from '../../redux/slices/langSlice';
import { selectMoonState } from '../../redux/slices/moonSlice';
import { useSelector } from 'react-redux';
import SliderComp from '../sliderComp/SliderComp';
import LinksComp from '../linksComp/LinksComp';


const ContactComp = () => {

  const langState = useSelector(selectLangState).lang;
  const moonState = useSelector(selectMoonState).moon;

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<IContactData>();



  const onSubmit: SubmitHandler<IContactData> = async (data) => {
    console.log(data);
    try {
      await axios.post(`/user-register`, data);
      console.log('Formulario enviado con éxito');
      reset();
    } catch (error) {
      console.error('Error al enviarlo', error);
        // Verificación de tipos para 'error.response'
      if (axios.isAxiosError(error) && error.response) {
        console.error('Detalles del error:', error.response.data);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  };

  const containerColor = `${styles.container} ${moonState ? styles.containerWhite : ''}`;
  const inputColor = `${styles.input} ${moonState ? styles.backWhite : ''}`;
  const textareaColor = `${styles.textarea} ${moonState ? styles.backWhite : ''}`;
  const submitColor = `${styles.submit} ${moonState ? styles.backWhite : ''}`;

  console.log('errors in form: ', errors);

  return (
    <div className={containerColor}>
      <SliderComp/>
      <div className={styles.dataMainContainer}>
        <h4 className={styles.dataTitle}>
          {langState === 'es' ? 'Mis datos de contacto' : 'My contact data'}
        </h4>
        <div className={styles.dataContainer}>
          <div className={styles.data}>
            <div className={styles.dataBlock}>
              <h6>
                {langState === 'es' ? 'Correo electrónico:' : 'Email:'}
              </h6>
              <p>
                jorgeacostadeleon@yahoo.com
              </p>
            </div>
            <div className={styles.dataBlock}>
              <h6>
                {langState === 'es' ? 'Teléfono:' : 'Phone number:'}
              </h6>
              <p>
                +54 9 264-673 0581
              </p>
            </div>
            <div className={styles.dataBlock}>
              <h6>
                {langState === 'es' ? 'Domicilio:' : 'Address:'}
              </h6>
              <p>
                Barrio Cooperarq VIII - Manzana "A" - Casa 24 - Rivadavia - San Juan - Argentina. CP. 5400.
              </p>
            </div>
          </div>
          <LinksComp/>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h4 className={styles.formTitle}>
          {langState === 'es' ? 'Envíame un mensaje' : 'Send me a message'}
        </h4>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputBlock}>
            <label 
              htmlFor='name'>
              {langState === 'es' ? 'Nombre' : 'Name'}
            </label>
            <input 
              {...register('name',{
                required: true,
                minLength: 2
              })}
              placeholder={langState === 'es' ? 'Ingrese nombre...' :  'Enter name...'}
              className={inputColor}
            />
            {errors.name && errors.name.type === "required" && (
              <p>Debe ingresar un nombre</p>
            )}
            {errors.name && errors.name.type === "minLength" && (
              <p>El nombre debe tener al menos 2 caracteres</p>
            )}
          </div>
          <div className={styles.inputBlock}>
            <label 
              htmlFor='email'>
              {langState === 'es' ? 'Correo'  : 'Email'}
            </label>
            <input 
              {...register('email',{
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'hola'
                } // Expresión regular para validar el formato de correo electrónico
              })}
              placeholder='Ingrese correo...'
              className={inputColor}
            />
           {errors.email && errors.email.type === "required" && (
              <p>Debe ingresar un correo</p>
            )}
           {errors.email && (
              <p>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.inputBlock}>
            <label 
              htmlFor='subject'>
              {langState === 'es'  ? 'Asunto' : 'Subject'}
            </label>
            <input 
              {...register(
                'subject',
              )}
              placeholder={langState === 'es' ? 'Ingrese asunto...' : 'Enter subject...'}
              className={inputColor}
            />
            {errors.subject && <span>{errors.subject.message}</span>}
          </div>
          <div className={styles.inputBlock}>
            <label 
              htmlFor='message'>
              {langState === 'es' ? 'Mensaje' : 'Message'}
            </label>
            <textarea 
              {...register(
                'message',
              )}
              placeholder={langState === 'es' ? 'Ingrese su mensaje...' : 'Enter your message...'}
              className={textareaColor}
            />
            {errors.message && <span>{errors.message.message}</span>}
          </div>
          <button
            className={submitColor}
            type='submit'
          >
            <p>
              { langState === 'es' ? 'Enviar' : 'Submit' }
            </p>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactComp
