import React, { useState, useEffect } from 'react';
import { MapPin, Building, Hospital, ChevronDown } from 'lucide-react';

const HospitalSelector = ({ data, onFinish }) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDelegation, setSelectedDelegation] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [availableDelegations, setAvailableDelegations] = useState([]);
  const [availableCommunes, setAvailableCommunes] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setIsSubmitDisabled(hospitals.length === 0);
  }, [hospitals]);

  const handleRegionChange = (e) => {
    const regionName = e.target.value;
    setSelectedRegion(regionName);
    const region = data.find((r) => r.region === regionName);
    setAvailableDelegations(region?.delegations || []);
    setSelectedDelegation('');
    setAvailableCommunes([]);
    setSelectedCommune('');
    setHospitals([]);
  };

  const handleDelegationChange = (e) => {
    const delegationName = e.target.value;
    setSelectedDelegation(delegationName);
    const delegation = availableDelegations.find((d) => d.delegation === delegationName);
    setAvailableCommunes(delegation?.communes || []);
    setSelectedCommune('');
    setHospitals([]);
  };

  const handleCommuneChange = (e) => {
    const communeName = e.target.value;
    setSelectedCommune(communeName);
    const commune = availableCommunes.find((c) => c.commune === communeName);
    setHospitals(commune?.hopitaux || []);
  };

  const handleSubmit = () => {
    onFinish(hospitals);
  };

  const SelectField = ({
    icon,
    label,
    value,
    onChange,
    options,
    placeholder,
    disabled = false,
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-500"
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Hospital Finder</h2>

      <div className="space-y-4">
        <SelectField
          icon={<MapPin size={16} className="text-gray-500" />}
          label="Region"
          value={selectedRegion}
          onChange={handleRegionChange}
          placeholder="Choose a region"
          options={data.map((region) => ({
            value: region.region,
            label: region.region,
          }))}
        />

        <SelectField
          icon={<MapPin size={16} className="text-gray-500" />}
          label="Delegation"
          value={selectedDelegation}
          onChange={handleDelegationChange}
          placeholder="Choose a delegation"
          options={availableDelegations.map((delegation) => ({
            value: delegation.delegation,
            label: delegation.delegation,
          }))}
          disabled={!selectedRegion}
        />

        <SelectField
          icon={<Building size={16} className="text-gray-500" />}
          label="Municipality"
          value={selectedCommune}
          onChange={handleCommuneChange}
          placeholder="Choose a municipality"
          options={availableCommunes.map((commune) => ({
            value: commune.commune,
            label: commune.commune,
          }))}
          disabled={!selectedDelegation}
        />
      </div>

      {selectedCommune && (
        <div className="mt-6">
          <h3 className="flex items-center text-md font-medium text-gray-800 mb-3">
            <Hospital size={18} className="mr-2 text-blue-600" />
            Available Hospitals
          </h3>

        {/*  {hospitals.length > 0 ? (
            <ul className="bg-gray-50 rounded-md p-3 max-h-60 overflow-y-auto">
              {hospitals.map((hospital, index) => (
                <li
                  key={index}
                  className="flex items-start py-2 border-b border-gray-200 last:border-0"
                >
                  <Hospital size={16} className="mr-2 mt-1 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{hospital}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-md text-gray-500">
              No hospitals found in this municipality.
            </div>
          )} */}
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default HospitalSelector;
