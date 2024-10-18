import './AuthorizationPage.scss'
import AuthorizationForm from '../../features/AuthorizationForm/AuthorizationForm'


function AuthorizationPage() {
  return (
    <div className="container">
      <main>
        <div className="authorization">
          
          <h1 className="authorization__header">
            Для оформления подписки на тариф, необходимо авторизоваться.
          </h1>

          <div className='authorization-image-wrapper'>
            <div className='authorization__image'></div>
          </div>


          <div className='authorization-form-wrapper'>
            <AuthorizationForm />
          </div>



        </div>
      </main>
    </div>
  )
}

export default AuthorizationPage