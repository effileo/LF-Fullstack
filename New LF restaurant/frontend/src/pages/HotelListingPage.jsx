import React, { useEffect, useState } from 'react';
import api from '../api/client';
import Navbar from '../components/Navbar';
import HotelCard from '../components/HotelCard';
import '../index.css';

export default function HotelListingPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        setHotels(response.data || []);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError('Unable to load hotels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-body)' }}>
      <Navbar />

      <div className="container page-section" style={{ flex: 1 }}>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
            Our Destinations
          </h2>
          <p className="mb-12 max-w-xl mx-auto" style={{ color: 'var(--text-muted)', fontSize: '1rem', textAlign: 'center' }}>
            Curated stays across Ethiopia’s finest addresses.
          </p>
        </div>

        {loading ? (
          <p className="text-center py-16" style={{ color: 'var(--text-muted)' }}>Loading collection…</p>
        ) : error ? (
          <p className="text-center py-16" style={{ color: '#f87171' }}>{error}</p>
        ) : (
          <div className="hotel-grid">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
