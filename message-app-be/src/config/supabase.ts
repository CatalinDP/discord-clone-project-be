// Archivo para configuración y creación de SUPABASE
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('ERROR: FALTAN VARIABLES DE ENTORNO URL O KEY - SUPABASE');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
