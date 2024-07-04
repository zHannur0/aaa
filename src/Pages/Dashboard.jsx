import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../Components/Header";
import graph1 from "../assets/graph1.svg";
import graph2 from "../assets/graph2.svg";
import graph3 from "../assets/graph3.svg";
import graph4 from "../assets/graph4.svg";
import searchIcon from '../assets/Search.svg';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [totals, setTotals] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ihunterToken');

    if (!token ) {
      navigate('/');
    } else {
      fetchAnalytics(token);
      fetchResponses(token);
    }
  }, [navigate]);

  const fetchAnalytics = async (token) => {
    try {
      const response = await axios.get('/hh/responses-analytics', {
        headers: {
          Authorization: `Bearer ${token}`,
          hhtoken: 'USERNBMEB0P2IAK1SPIA5ORKJMNKNRMIL56DCNE06E8KEHNMCFF8M1CU145RS0HG'
        }
      });
      if (response.data) {
        setAnalytics(response.data.percentageIncrease);
        setTotals(response.data.totals);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchResponses = async (token) => {
    try {
      const response = await axios.get('/hh/responses', {
        headers: {
          Authorization: `Bearer ${token}`,
          hhtoken: 'USERNBMEB0P2IAK1SPIA5ORKJMNKNRMIL56DCNE06E8KEHNMCFF8M1CU145RS0HG'
        }
      });
      if (response.data && Array.isArray(response.data.items)) {
        setFilteredJobs(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filteredJobs.filter((job) =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.vacancyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const formatPercentage = (value) => {
    const formattedValue = value.toFixed(2);
    return (
      <span className={`font-bold text-[20px] ${value < 0 ? 'text-[#DC1500]' : 'text-[#6FCF97]'}`}>
        {value < 0 ? `${formattedValue}%` : `+${formattedValue}%`}
      </span>
    );
  };

  const formatSalary = (salary) => {
    if (typeof salary === 'object' && salary !== null) {
      return `${salary.from ? salary.from : 'N/A'} - ${salary.to ? salary.to : 'N/A'} ${salary.currency}`;
    }
    return salary;
  };

  return (
    <div>
      <Header />

      <div className="max-w-[1150px] mx-[auto] mt-[60px]">
        <h1 className="text-[36px] font-bold leading-[44px] text-center mb-[60px]">Отклики отобразятся здесь</h1>
        <ul className="flex justify-between">
          <li className="w-[250px] bg-white flex items-center rounded-[5px] p-[16px] h-[150px] justify-between">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-[16px] font-regular text-[#333] mb-[12px]">Вакансии</p>
                <p className="text-[28px] leading-[30px] text-[#666]">{totals?.totalNegotiations}</p>
              </div>
              {analytics && formatPercentage(analytics.totalNegotiations)}
            </div>
            <img src={graph1} alt="" />
          </li>
          <li className="w-[250px] bg-white flex items-center rounded-[5px] p-[16px] h-[150px] justify-between">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-[16px] font-regular text-[#333] mb-[12px]">Отклики</p>
                <p className="text-[28px] leading-[30px] text-[#666]">{totals?.responseSent}</p>
              </div>
              {analytics && formatPercentage(analytics.responseSent)}
            </div>
            <img src={graph2} alt="" />
          </li>
          <li className="w-[250px] bg-white flex items-center rounded-[5px] p-[16px] h-[150px] justify-between">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-[16px] font-regular text-[#333] mb-[12px]">Приглашение</p>
                <p className="text-[28px] leading-[30px] text-[#666]">{totals?.invitationsReceived}</p>
              </div>
              {analytics && formatPercentage(analytics.invitationsReceived)}
            </div>
            <img src={graph3} alt="" />
          </li>
          <li className="w-[250px] bg-white flex items-center rounded-[5px] p-[16px] h-[150px] justify-between">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-[16px] font-regular text-[#333] mb-[12px]">Отказы</p>
                <p className="text-[28px] leading-[30px] text-[#666]">{totals?.rejectedNegotiations}</p>
              </div>
              {analytics && formatPercentage(analytics.rejectedNegotiations)}
            </div>
            <img src={graph4} alt="" />
          </li>
        </ul>
        <form className="mt-[35px] w-full flex" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by Category, Company or ..."
            className="w-[90%] h-[50px] rounded-l-full px-[30px] font-regular placeholder:text-[#c2c2c2] text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="w-[10%] bg-[#5060FF] h-[50px] rounded-r-full flex items-center justify-center gap-[5px]">
            <span className="text-white">Search</span>
            <img src={searchIcon} alt="" />
          </button>
        </form>

        <div className="mt-[35px]">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-[20px] mb-[10px] rounded-[16px] shadow-sm flex justify-between items-center">
              <div className="flex items-center w-[80%]">
                {job.companyLogo && <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-[50px] h-[auto] mr-[20px]"/>}
                <div>
                  <h3 className="text-[24px] font-semibold text-[#3B3B3B]">{job.companyName}</h3>
                  <p className="text-[16px] text-[#626262] font-regular">{job.vacancyName}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-start w-[15%]">
                <span className='text-[#626262] text-[12px] font-regular'>State</span>
                <p className="text-[14px] text-[#3B3B3B] font-medium">{job.state}</p>
                <p className="mt-[8px] text-[#5060FF] text-[20px] font-semibold text-start">{formatSalary(job.salary)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
