import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  ActivityIndicator, 
  Modal, 
  FlatList, 
  TouchableOpacity, 
  Image 
} from 'react-native';

const API_KEY = '9e13da419adab6539177249e';

export const currenciesData = {
  AED: { name: 'United Arab Emirates Dirham', flag: require('../assets/ae.png') },
  AFN: { name: 'Afghan Afghani', flag: require('../assets/af.png') },
  ALL: { name: 'Albanian Lek', flag: require('../assets/al.png') },
  AMD: { name: 'Armenian Dram', flag: require('../assets/am.png') },
  ANG: { name: 'Netherlands Antillean Guilder', flag: require('../assets/nl.png') },
  AOA: { name: 'Angolan Kwanza', flag: require('../assets/ao.png') },
  ARS: { name: 'Argentine Peso', flag: require('../assets/ar.png') },
  AUD: { name: 'Australian Dollar', flag: require('../assets/au.png') },
  AWG: { name: 'Aruban Florin', flag: require('../assets/aw.png') },
  AZN: { name: 'Azerbaijani Manat', flag: require('../assets/az.png') },
  BAM: { name: 'Bosnia and Herzegovina Convertible Mark', flag: require('../assets/ba.png') },
  BBD: { name: 'Barbadian Dollar', flag: require('../assets/bb.png') },
  BDT: { name: 'Bangladeshi Taka', flag: require('../assets/bd.png') },
  BGN: { name: 'Bulgarian Lev', flag: require('../assets/bg.png') },
  BHD: { name: 'Bahraini Dinar', flag: require('../assets/bh.png') },
  BIF: { name: 'Burundian Franc', flag: require('../assets/bi.png') },
  BMD: { name: 'Bermudian Dollar', flag: require('../assets/bm.png') },
  BND: { name: 'Brunei Dollar', flag: require('../assets/bn.png') },
  BOB: { name: 'Bolivian Boliviano', flag: require('../assets/bo.png') },
  BRL: { name: 'Brazilian Real', flag: require('../assets/br.png') },
  BSD: { name: 'Bahamian Dollar', flag: require('../assets/bs.png') },
  BTN: { name: 'Bhutanese Ngultrum', flag: require('../assets/bt.png') },
  BWP: { name: 'Botswana Pula', flag: require('../assets/bw.png') },
  BYN: { name: 'Belarusian Ruble', flag: require('../assets/by.png') },
  BZD: { name: 'Belize Dollar', flag: require('../assets/bz.png') },
  CAD: { name: 'Canadian Dollar', flag: require('../assets/ca.png') },
  CDF: { name: 'Congolese Franc', flag: require('../assets/cd.png') },
  CHF: { name: 'Swiss Franc', flag: require('../assets/ch.png') },
  CLP: { name: 'Chilean Peso', flag: require('../assets/cl.png') },
  CNY: { name: 'Chinese Yuan', flag: require('../assets/cn.png') },
  COP: { name: 'Colombian Peso', flag: require('../assets/co.png') },
  CRC: { name: 'Costa Rican Colón', flag: require('../assets/cr.png') },
  CZK: { name: 'Czech Koruna', flag: require('../assets/cz.png') },
  CUP: { name: 'Cuban Peso', flag: require('../assets/cu.png') },
  DKK: { name: 'Danish Krone', flag: require('../assets/dk.png') },
  DZD: { name: 'Algerian Dinar', flag: require('../assets/dz.png') },
  EGP: { name: 'Egyptian Pound', flag: require('../assets/eg.png') },
  ERN: { name: 'Eritrean Nakfa', flag: require('../assets/er.png') },
  ETB: { name: 'Ethiopian Birr', flag: require('../assets/et.png') },
  EUR: { name: 'Euro', flag: require('../assets/eu.png') },
  FJD: { name: 'Fijian Dollar', flag: require('../assets/fj.png') },
  GBP: { name: 'British Pound Sterling', flag: require('../assets/gb.png') },
  GEL: { name: 'Georgian Lari', flag: require('../assets/ge.png') },
  GHS: { name: 'Ghanaian Cedi', flag: require('../assets/gh.png') },
  GIP: { name: 'Gibraltar Pound', flag: require('../assets/gi.png') },
  GMD: { name: 'Gambian Dalasi', flag: require('../assets/gm.png') },
  GNF: { name: 'Guinean Franc', flag: require('../assets/gn.png') },
  GTQ: { name: 'Guatemalan Quetzal', flag: require('../assets/gt.png') },
  GYD: { name: 'Guyanese Dollar', flag: require('../assets/gy.png') },
  HKD: { name: 'Hong Kong Dollar', flag: require('../assets/hk.png') },
  HNL: { name: 'Honduran Lempira', flag: require('../assets/hn.png') },
  HRK: { name: 'Croatian Kuna', flag: require('../assets/hr.png') },
  HUF: { name: 'Hungarian Forint', flag: require('../assets/hu.png') },
  IDR: { name: 'Indonesian Rupiah', flag: require('../assets/id.png') },
  ILS: { name: 'Israeli New Shekel', flag: require('../assets/il.png') },
  INR: { name: 'Indian Rupee', flag: require('../assets/in.png') },
  IQD: { name: 'Iraqi Dinar', flag: require('../assets/iq.png') },
  IRR: { name: 'Iranian Rial', flag: require('../assets/ir.png') },
  ISK: { name: 'Icelandic Króna', flag: require('../assets/is.png') },
  JMD: { name: 'Jamaican Dollar', flag: require('../assets/jm.png') },
  JOD: { name: 'Jordanian Dinar', flag: require('../assets/jo.png') },
  JPY: { name: 'Japanese Yen', flag: require('../assets/jp.png') },
  KES: { name: 'Kenyan Shilling', flag: require('../assets/ke.png') },
  KGS: { name: 'Kyrgyzstani Som', flag: require('../assets/kg.png') },
  KHR: { name: 'Cambodian Riel', flag: require('../assets/kh.png') },
  KMF: { name: 'Comorian Franc', flag: require('../assets/km.png') },
  KRW: { name: 'South Korean Won', flag: require('../assets/kr.png') },
  KWD: { name: 'Kuwaiti Dinar', flag: require('../assets/kw.png') },
  KZT: { name: 'Kazakhstani Tenge', flag: require('../assets/kz.png') },
  LAK: { name: 'Laotian Kip', flag: require('../assets/la.png') },
  LBP: { name: 'Lebanese Pound', flag: require('../assets/lb.png') },
  LKR: { name: 'Sri Lankan Rupee', flag: require('../assets/lk.png') },
  LRD: { name: 'Liberian Dollar', flag: require('../assets/lr.png') },
  LYD: { name: 'Libyan Dinar', flag: require('../assets/ly.png') },
  MAD: { name: 'Moroccan Dirham', flag: require('../assets/ma.png') },
  MDL: { name: 'Moldovan Leu', flag: require('../assets/md.png') },
  MGA: { name: 'Malagasy Ariary', flag: require('../assets/mg.png') },
  MKD: { name: 'Macedonian Denar', flag: require('../assets/mk.png') },
  MMK: { name: 'Myanmar Kyat', flag: require('../assets/mm.png') },
  MNT: { name: 'Mongolian Tögrög', flag: require('../assets/mn.png') },
  MOP: { name: 'Macanese Pataca', flag: require('../assets/mo.png') },
  MUR: { name: 'Mauritian Rupee', flag: require('../assets/mu.png') },
  MVR: { name: 'Maldivian Rufiyaa', flag: require('../assets/mv.png') },
  MWK: { name: 'Malawian Kwacha', flag: require('../assets/mw.png') },
  MXN: { name: 'Mexican Peso', flag: require('../assets/mx.png') },
  MYR: { name: 'Malaysian Ringgit', flag: require('../assets/my.png') },
  MZN: { name: 'Mozambican Metical', flag: require('../assets/mz.png') },
  NAD: { name: 'Namibian Dollar', flag: require('../assets/na.png') },
  NGN: { name: 'Nigerian Naira', flag: require('../assets/ng.png') },
  NIO: { name: 'Nicaraguan Córdoba', flag: require('../assets/ni.png') },
  NOK: { name: 'Norwegian Krone', flag: require('../assets/no.png') },
  NPR: { name: 'Nepalese Rupee', flag: require('../assets/np.png') },
  NZD: { name: 'New Zealand Dollar', flag: require('../assets/nz.png') },
  OMR: { name: 'Omani Rial', flag: require('../assets/om.png') },
  PAB: { name: 'Panamanian Balboa', flag: require('../assets/pa.png') },
  PEN: { name: 'Peruvian Sol', flag: require('../assets/pe.png') },
  PHP: { name: 'Philippine Peso', flag: require('../assets/ph.png') },
  PKR: { name: 'Pakistani Rupee', flag: require('../assets/pk.png') },
  PLN: { name: 'Polish Złoty', flag: require('../assets/pl.png') },
  PYG: { name: 'Paraguayan Guaraní', flag: require('../assets/py.png') },
  QAR: { name: 'Qatari Riyal', flag: require('../assets/qa.png') },
  RON: { name: 'Romanian Leu', flag: require('../assets/ro.png') },
  RSD: { name: 'Serbian Dinar', flag: require('../assets/rs.png') },
  RUB: { name: 'Russian Ruble', flag: require('../assets/ru.png') },
  RWF: { name: 'Rwandan Franc', flag: require('../assets/rw.png') },
  SAR: { name: 'Saudi Riyal', flag: require('../assets/sa.png') },
  SEK: { name: 'Swedish Krona', flag: require('../assets/se.png') },
  SGD: { name: 'Singapore Dollar', flag: require('../assets/sg.png') },
  THB: { name: 'Thai Baht', flag: require('../assets/th.png') },
  TRY: { name: 'Turkish Lira', flag: require('../assets/tr.png') },
  TWD: { name: 'New Taiwan Dollar', flag: require('../assets/tw.png') },
  TZS: { name: 'Tanzanian Shilling', flag: require('../assets/tz.png') },
  UAH: { name: 'Ukrainian Hryvnia', flag: require('../assets/ua.png') },
  UGX: { name: 'Ugandan Shilling', flag: require('../assets/ug.png') },
  USD: { name: 'United States Dollar', flag: require('../assets/us.png') },
  UYU: { name: 'Uruguayan Peso', flag: require('../assets/uy.png') },
  UZS: { name: 'Uzbekistan Som', flag: require('../assets/uz.png') },
  VND: { name: 'Vietnamese Dong', flag: require('../assets/vn.png') },
  ZAR: { name: 'South African Rand', flag: require('../assets/za.png') },
  ZMW: { name: 'Zambian Kwacha', flag: require('../assets/zm.png') },
  // ...Add or remove as needed...
};

// Custom picker component with search functionality
function CurrencyPicker({ selectedValue, onValueChange, currencies, currenciesData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter currencies based on search query
  const filteredCurrencies = currencies.filter((currency) => {
    const info = currenciesData[currency];
    const searchString = info ? `${info.name} (${currency})` : currency;
    return searchString.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
        {selectedValue ? (
          <View style={styles.pickerItem}>
            {currenciesData[selectedValue] && (
              <Image source={currenciesData[selectedValue].flag} style={styles.flagImage} />
            )}
            <Text style={styles.pickerText}>
              {currenciesData[selectedValue]
                ? `${currenciesData[selectedValue].name} (${selectedValue})`
                : selectedValue}
            </Text>
          </View>
        ) : (
          <Text style={styles.pickerText}>Select a currency</Text>
        )}
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search currency..."
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onValueChange(item);
                  setModalVisible(false);
                  setSearchQuery('');
                }}
              >
                {currenciesData[item] && (
                  <Image source={currenciesData[item].flag} style={styles.flagImage} />
                )}
                <Text style={styles.modalText}>
                  {currenciesData[item]
                    ? `${currenciesData[item].name} (${item})`
                    : item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => { setModalVisible(false); setSearchQuery(''); }} />
        </View>
      </Modal>
    </View>
  );
}

export default function CurrencyConverter() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch supported currencies on mount using USD as base
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      const data = await response.json();
      const currencyKeys = Object.keys(data.conversion_rates);
      if (!currencyKeys.includes(data.base_code)) {
        currencyKeys.push(data.base_code);
      }
      setCurrencies(currencyKeys.sort());
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const convertCurrency = async () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount)) {
      alert('Please enter a valid number');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
      const data = await response.json();
      const rate = data.conversion_rates[targetCurrency];
      if (!rate) {
        alert('Conversion rate not available');
        setLoading(false);
        return;
      }
      const convertedAmount = inputAmount * rate;
      setResult(convertedAmount.toFixed(2));
      setLoading(false);
    } catch (error) {
      console.error('Error converting currency:', error);
      alert('Error fetching conversion rate');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>From:</Text>
      <CurrencyPicker 
        selectedValue={baseCurrency}
        onValueChange={setBaseCurrency}
        currencies={currencies}
        currenciesData={currenciesData}
      />
      
      <Text style={{ color: 'white' }}>To:</Text>
      <CurrencyPicker 
        selectedValue={targetCurrency}
        onValueChange={setTargetCurrency}
        currencies={currencies}
        currenciesData={currenciesData}
      />

      <Text style={{ color: 'white' }}>Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="gray"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Convert" onPress={convertCurrency} />
      )}

      {result && (
        <Text style={styles.result}>
          {amount} {baseCurrency} = {result} {targetCurrency}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1119'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'white'
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerText: {
    color: 'white', // white text for selected currency display
  },
  flagImage: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1119'
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white'
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  modalText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white' // white text for currency names in the modal
  },
});
