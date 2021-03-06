import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LogoUTC2 from '../assets/images/uct2.png';
import Helmet from '../components/Helmet';
import { login } from '../redux/actions/authAction';

const Login = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <Helmet title="Đăng nhập">
      <div className="auth_page">
        <div className="auth_page-title">
          UTC2 Media <h5>UTC2 Media giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <h3 className="text-uppercase text-center mb-2" style={{ color: '#002F77' }}>
            UTC2 Media
          </h3>
          <img src={LogoUTC2}></img>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleChangeInput}
              value={email}
              style={{ borderRadius: '10px' }}
              placeholder="Email..."
            />
          </div>

          <div className="form-group">
            <div className="pass">
              <input
                type={typePass ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChangeInput}
                value={password}
                name="password"
                style={{ borderRadius: '10px' }}
                placeholder="Mật khẩu..."
              />

              <small onClick={() => setTypePass(!typePass)}>{typePass ? 'Ẩn' : 'Hiện'}</small>
            </div>
          </div>

          <button type="submit" className="btn btn-login btn-warning w-100" disabled={email && password ? false : true}>
            Đăng Nhập
          </button>

          <div
            className=""
            style={{
              color: '#0075FF',
              margin: '17px 5px 12px 64px',
              borderBottom: '1px solid #dbdbdb',
              width: '67%',
              textAlign: 'center',
            }}
          >
            <Link to="/forgot_password" style={{ marginRight: '10px' }}>
              Quên Mật Khẩu?
            </Link>

            <Link to="/register">Đăng ký tài khoản</Link>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default Login;
