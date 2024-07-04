import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../Components/Header";
import PositionTable from "../Components/PositionTable";
import sendIcon from '../assets/sendIcon.svg';

export default function MainPage() {
  const [positions, setPositions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let token = params.get('token');

    if (!token) {
      token = localStorage.getItem('ihunterToken');
    }

    if (!token) {
      navigate('/');
    } else {
      localStorage.setItem('ihunterToken', token);
      fetchPositions(token);
    }
  }, [location, navigate]);

  const fetchPositions = async (token) => {
    try {
      const response = await axios.get('/vacancies/get-positions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && Array.isArray(response.data.positions)) {
        setPositions(response.data.positions);
      } else {
        setPositions([]);
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
      setPositions([]);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('ihunterToken');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      await axios.post('/vacancies/input-positions', { position: inputValue }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchPositions(token);  // Re-fetch positions after submitting
      setInputValue('');
    } catch (error) {
      console.error('Error submitting position:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="mt-[120px] w-[1150px] mx-[auto] flex flex-col items-center">
        <h1 className="mb-[50px] text-[36px] font-bold leading-[44px]">Найди свою работу в один клик</h1>
        <form className="w-full flex justify-center gap-[5px]" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Напиши свой желаемый должность"
            className="h-[60px] w-[70%] text-[14px] font-regular rounded-[16px] px-[16px]"
            style={{ boxShadow: '0px 2px 4px 0px rgba(25, 33, 61, 0.08)' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="h-[60px] w-[60px] bg-[#2B2B2B] flex items-center justify-center rounded-[16px]"
            style={{ boxShadow: '0px 2px 5px 0px rgba(20, 88, 201, 0.17), 0px -2px 0.3px 0px rgba(14, 56, 125, 0.18) inset, 0px 2px 1px 0px rgba(255, 255, 255, 0.22) inset' }}
          >
            <img src={sendIcon} className="max-w-[20px] max-h-[20px]" alt="" />
          </button>
        </form>
      </div>
      <div className="w-[1150px] mx-[auto] mt-[100px]">
        <h1 className="text-[28px] font-semibold mb-[10px]">Ваши желаемые позиции</h1>
        <PositionTable data={positions} setPositions={setPositions} />
      </div>
    </div>
  );
}
