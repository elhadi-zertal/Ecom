const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zmeueblvjrqugcjpybsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZXVlYmx2anJxdWdjanB5YnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM3NDcsImV4cCI6MjA4OTQ0OTc0N30.rt_qv1SzQOuqUMed_0e3_-MhbHW2hmJUxD6W65UwL-k';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  // Test login
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'elhadi@gmail.com',
    password: '123456'
  });
  if (loginError) console.error("Login failed:", loginError.message);
  else console.log("Login success.");

  // Fetch products
  const { data: products, error: prodError } = await supabase.from('products').select('*');
  if (prodError) console.error("Error fetching products:", prodError.message);
  else {
    console.log("Products count:", products.length);
    if (products.length > 0) {
      console.log("First product images field type:", typeof products[0].images, Array.isArray(products[0].images) ? "Array" : "");
      console.log("First product data:", products[0]);
    }
  }

  // Check Storage buckets (if possible)
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) {
    console.log("Cannot list buckets with anon/user key:", bucketsError.message);
  } else {
    console.log("Buckets:", buckets.map(b => b.name));
  }
}

check();
