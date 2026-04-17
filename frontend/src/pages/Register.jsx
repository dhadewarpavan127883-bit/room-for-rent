import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted fw-semibold">Full Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg bg-light" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted fw-semibold">Email address</label>
                <input 
                  type="email" 
                  className="form-control form-control-lg bg-light" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted fw-semibold">Password</label>
                <input 
                  type="password" 
                  className="form-control form-control-lg bg-light" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mb-3">Register</button>
            </form>
            <div className="text-center text-muted">
              Already have an account? <Link to="/login" className="text-decoration-none fw-semibold">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
