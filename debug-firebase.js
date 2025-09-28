// Debug script to check Firebase connection and query incidents
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, orderBy, limit, getDocs } = require('firebase/firestore');

// Read from .env file
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log('🔧 Firebase Config Check:');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('Has API Key:', !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your-api-key-here');

async function checkFirebaseData() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('\n🔗 Firebase connection established');
    
    // Query incidents collection
    const incidentsQuery = query(
      collection(db, 'incidents'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    
    console.log('\n📊 Querying incidents collection...');
    const snapshot = await getDocs(incidentsQuery);
    
    console.log(`Found ${snapshot.size} incidents`);
    
    if (snapshot.empty) {
      console.log('❌ No incidents found in database');
      return;
    }
    
    const fireIncidents = [];
    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\n📄 Incident ${index + 1}:`);
      console.log(`  ID: ${doc.id}`);
      console.log(`  Title: ${data.title}`);
      console.log(`  Category: ${data.category}`);
      console.log(`  Severity: ${data.severity}`);
      console.log(`  Status: ${data.status}`);
      console.log(`  Description: ${data.description?.substring(0, 100)}...`);
      
      if (data.category?.toLowerCase().includes('fire')) {
        fireIncidents.push(data);
      }
    });
    
    console.log(`\n🔥 Found ${fireIncidents.length} fire-related incidents`);
    if (fireIncidents.length > 0) {
      console.log('\n🚨 Last 3 Fire Alerts:');
      fireIncidents.slice(0, 3).forEach((incident, i) => {
        console.log(`${i + 1}. ${incident.title} - ${incident.description?.substring(0, 80)}...`);
      });
    }
    
  } catch (error) {
    console.error('❌ Firebase Error:', error.message);
    if (error.code === 'permission-denied') {
      console.log('🔒 Permission denied - check Firestore security rules');
    } else if (error.code === 'unavailable') {
      console.log('🌐 Service unavailable - check internet connection');
    }
  }
}

checkFirebaseData();