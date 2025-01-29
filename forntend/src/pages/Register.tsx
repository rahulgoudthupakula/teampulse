import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { authService } from "../services/authService"
import { Password } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'candidate',
    })
    const [slideIndex, setSlideIndex] = useState(0)
    const navigate = useNavigate();
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted:'+ formData)
      

      const response = await authService.register(formData.email, formData.password)
    if (response) {
      navigate('/home'); // Navigate to the dashboard or desired route
    } else {
      // Handle login failure
      console.error('Login failed');
    }
      // Add your form submission logic here
    }
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSlideIndex(prev => (prev + 1) % 7)
      }, 5000)
      return () => clearInterval(interval)
    }, [])

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-1 p-4 bg-white rounded-s-3xl">
        {/* Left side with image and job types */}
        <div className="relative bg-[#FFC107] rounded-3xl p-8 hidden md:block">
          <div className="absolute top-4 left-4">
            <span className="text-2xl font-bold text-blue-900">Team</span>
          </div>
          
          <div className="slideshow-container">
            {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
              <div key={num} className={`mySlides fade ${index === slideIndex ? 'active' : ''}`}>
                <img src={`/img/login-img-${num}.png`} alt={`Login slide ${num}`} className="w-[88%] h-[77%]" />
              </div>
            ))}
            <div className="dots-container">
              {[...Array(7)].map((_, i) => (
                <span key={i} className={`dot ${i === slideIndex ? 'active' : ''}`}></span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex flex-col justify-center  p-4 h-[500px] overflow-scroll">
          <div className="mb-8 mt-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                👋
              </span>
              <span className="text-gray-600">Hi, Unstoppable</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back to Unstop!</h1>
          </div>
          <div className="w-full  flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Create an account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
              <div className="flex space-x-4">
                {['candidate', 'company', 'host'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={formData.userType === type}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
          
        </div>
      </div>
      <style >{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
        }
        .login-left {
          flex: 1;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .logo {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        .logo h2 {
          font-size: 2.5rem;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .logo span {
          color: #4a90e2;
        }
        .slideshow-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .mySlides {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .mySlides.active {
          opacity: 1;
        }
        .mySlides img {
          
          object-fit: cover;
        }
        .dots-container {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 10;
        }
        .dot {
          height: 10px;
          width: 10px;
          background-color: rgba(255,255,255,0.5);
          border-radius: 50%;
          display: inline-block;
          margin: 0 5px;
          transition: background-color 0.3s ease;
        }
        .dot.active {
          background-color: #fff;
        }
        .login-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          height: 100%;
        }
        .login-box {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
        }
        .login-box h2 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .login-box p {
          color: #666;
          margin-bottom: 2rem;
          text-align: center;
        }
        .oauth-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .oauth-group {
          display: flex;
          gap: 1rem;
        }
        .oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          flex: 1;
        }
        .oauth-btn img {
          margin-right: 0.5rem;
        }
        .google { background-color: #DB4437; color: white; }
        .linkedin { background-color: #0077B5; color: white; }
        .github { background-color: #333; color: white; }
        .oauth-btn:hover { opacity: 0.9; }
        .divider {
          text-align: center;
          margin: 2rem 0;
          color: #666;
        }
        .divider::before,
        .divider::after {
          content: "";
          display: inline-block;
          width: 40%;
          border-top: 1px solid #ddd;
          vertical-align: middle;
          margin: 0 0.5rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .input-group label {
          margin-bottom: 0.5rem;
          color: #333;
        }
        .input-group input {
          padding: 0.55rem;
          
          border-radius: 5px;
          font-size: 1rem;
          outline: none;
        }
        .error-message {
          color: #e74c3c;
          font-size: 0.9rem;
        }
        .submit-btn {
          background-color: #4a90e2;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #3a7bc8;
        }
        .signup-text {
          text-align: center;
          margin-top: 1rem;
          color: #666;
        }
        .signup-text a {
          color: #4a90e2;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          .login-left, .login-right {
            flex: none;
            width: 100%;
          }
          .login-left {
            height: 40vh;
          }
          .login-right {
            height: 60vh;
          }
        }
      `}</style>
    </div>
  )
}

