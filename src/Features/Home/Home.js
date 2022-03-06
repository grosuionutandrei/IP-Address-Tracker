import styles from './Home.module.css';
import { useState } from 'react';

import { Map } from '../Map/Map';
import { Information } from '../Information/information';
export function Home() {
  const [searchedElement, setSearchedElement] = useState({
    searchedItem: '',
  });

  const [coords, setCoords] = useState({
    ip: '83.137.120.239',
    location: {
      city: 'Copenhagen',
      country: 'DK',
      lat: 55.67594,
      lng: 12.56553,
      postalCode: '',
      region: 'Region Hovedstaden',
      timezone: '+01:00',
    },
    as: {
      asn: 43557,
      name: 'ASEMNET',
      route: '83.137.120.0/21',
      domain: '',
      type: '',
    },
    isp: 'Eniig Fiber A/S',
  });

  const [errors, setErrors] = useState({
    searchedItem: null,
    wrongIp: '',
    wrongDomain: '',
  });

  // In order to obtain an api key visit
  const apiKey = 'Put your apikey here';

  function checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      console.warn('A fetch error has ocurred: ', res);
      setErrors({ ...errors, searchedItem: res.statusText });
      throw new Error('A fetch error has ocurred!');
    }
  }

  function defaultParameter() {
    return {
      ip: '83.137.120.239',
      location: {
        city: 'Copenhagen',
        country: 'DK',
        lat: 55.67594,
        lng: 12.56553,
        postalCode: '',
        region: 'Region Hovedstaden',
        timezone: '+01:00',
      },
      as: {
        asn: 43557,
        name: 'ASEMNET',
        route: '83.137.120.0/21',
        domain: '',
        type: '',
      },
      isp: 'Eniig Fiber A/S',
    };
  }

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setSearchedElement({ ...searchedElement, [e.target.name]: e.target.value });
  }

  async function getCoordsLocal() {
    try {
      const getCoords = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${searchedElement.searchedItem}`
      ).then((res) => checkRes(res));
      setCoords(getCoords);
      console.log(coords);
    } catch (error) {
      setCoords(defaultParameter());
      console.log(errors);
    }
  }
  async function getCoordsByDomain() {
    try {
      const getCoords = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${searchedElement.searchedItem}`
      ).then((res) => checkRes(res));
      setCoords(getCoords);
      console.log(coords);
    } catch (error) {
      setCoords(defaultParameter());
      console.log(errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Number.parseInt(searchedElement.searchedItem)) {
      getCoordsLocal();
    } else {
      getCoordsByDomain();
    }

    setSearchedElement({ ...searchedElement, searchedItem: '' });
  }

  if (!coords.location) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <header>
        <nav className={styles.navigation}>
          <div>
            <form
              className={styles.search}
              data-search="search"
              onSubmit={handleSubmit}
            >
              <button data-send="nothing" disabled={true}>
                {'<'}
              </button>
              <input
                data-insert="searchedItem"
                className={styles.search}
                id="searchedItem"
                type="text"
                name="searchedItem"
                placeholder="Search for an IP address or domain"
                onChange={handleInputChange}
                value={searchedElement.searchedItem}
              />

              <button data-send="submitId" type="submit">
                {'>'}
              </button>
              {errors.searchedItem && (
                <>
                  <p>{errors?.searchedItem}</p>
                </>
              )}
            </form>
          </div>
        </nav>
      </header>

      <Information coords={coords} />
      <Map coords={coords} />
    </>
  );
}
