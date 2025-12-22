'use server';

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SnowRequestFormData {
  name: string;
  phone: string;
  address: string;
  priority: 'high' | 'medium' | 'standard';
  notes?: string;
}

export interface SubmitSnowRequestResponse {
  success: boolean;
  error?: string;
  requestId?: string;
}

/**
 * Server action to submit a snow removal service request
 * Saves the request to the Supabase PostgreSQL database
 * 
 * @param formData - The snow request form data
 * @returns Success/error response with request ID
 */
export async function submitSnowRequest(
  formData: SnowRequestFormData
): Promise<SubmitSnowRequestResponse> {
  try {
    // Validate input data
    if (!formData.name || !formData.phone || !formData.address || !formData.priority) {
      return {
        success: false,
        error: 'Missing required fields',
      };
    }

    // Validate phone format
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(formData.phone)) {
      return {
        success: false,
        error: 'Invalid phone number format',
      };
    }

    // Validate priority value
    if (!['high', 'medium', 'standard'].includes(formData.priority)) {
      return {
        success: false,
        error: 'Invalid priority value',
      };
    }

    // Insert into Supabase
    const { data, error } = await supabase.from('snow_requests').insert([
      {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        priority: formData.priority,
        notes: formData.notes?.trim() || null,
        status: 'pending', // Default status
      },
    ]).select('id').single();

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        error: 'Failed to submit request. Please try again later.',
      };
    }

    return {
      success: true,
      requestId: data?.id,
    };
  } catch (err) {
    console.error('Unexpected error in submitSnowRequest:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

/**
 * Server action to retrieve all snow requests (admin use)
 * Only callable from authenticated admin users in production
 * 
 * @returns Array of snow requests
 */
export async function getSnowRequests() {
  try {
    const { data, error } = await supabase
      .from('snow_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return {
        success: false,
        error: 'Failed to retrieve requests',
      };
    }

    return {
      success: true,
      requests: data || [],
    };
  } catch (err) {
    console.error('Unexpected error in getSnowRequests:', err);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Server action to update snow request status
 * 
 * @param requestId - The ID of the request to update
 * @param status - The new status
 * @param notes - Optional notes to add
 * @returns Success/error response
 */
export async function updateSnowRequestStatus(
  requestId: string,
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled',
  notes?: string
) {
  try {
    if (!requestId) {
      return {
        success: false,
        error: 'Request ID is required',
      };
    }

    const updateData: any = { status };

    if (notes) {
      updateData.notes = notes.trim();
    }

    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('snow_requests')
      .update(updateData)
      .eq('id', requestId);

    if (error) {
      console.error('Supabase update error:', error);
      return {
        success: false,
        error: 'Failed to update request',
      };
    }

    // Log the activity
    await supabase.from('activity_log').insert([
      {
        request_id: requestId,
        action: `Status changed to ${status}`,
        details: notes || null,
      },
    ]);

    return {
      success: true,
    };
  } catch (err) {
    console.error('Unexpected error in updateSnowRequestStatus:', err);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Server action to get snow requests by status
 * 
 * @param status - Filter by status
 * @returns Array of filtered requests
 */
export async function getSnowRequestsByStatus(
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
) {
  try {
    const { data, error } = await supabase
      .from('snow_requests')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return {
        success: false,
        error: 'Failed to retrieve requests',
      };
    }

    return {
      success: true,
      requests: data || [],
    };
  } catch (err) {
    console.error('Unexpected error in getSnowRequestsByStatus:', err);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Server action to get high-priority snow requests
 * 
 * @returns Array of high-priority requests
 */
export async function getHighPriorityRequests() {
  try {
    const { data, error } = await supabase
      .from('snow_requests')
      .select('*')
      .eq('priority', 'high')
      .in('status', ['pending', 'confirmed'])
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error:', error);
      return {
        success: false,
        error: 'Failed to retrieve high-priority requests',
      };
    }

    return {
      success: true,
      requests: data || [],
    };
  } catch (err) {
    console.error('Unexpected error in getHighPriorityRequests:', err);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Server action to submit a volunteer application
 */
export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  availability: string;
  skills: string;
}

export interface SubmitVolunteerResponse {
  success: boolean;
  error?: string;
  volunteerId?: string;
}

export async function submitVolunteerApplication(
  data: VolunteerFormData
): Promise<SubmitVolunteerResponse> {
  try {
    // Validate required fields
    if (!data.name || !data.email) {
      return {
        success: false,
        error: 'Name and email are required',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    // Check if volunteer already exists
    const { data: existingVolunteer, error: checkError } = await supabase
      .from('volunteers')
      .select('id')
      .eq('email', data.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (expected)
      console.error('Error checking for existing volunteer:', checkError);
    }

    if (existingVolunteer) {
      return {
        success: false,
        error: 'This email is already registered as a volunteer',
      };
    }

    // Insert volunteer into database
    const { data: insertedVolunteer, error: insertError } = await supabase
      .from('volunteers')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          availability: data.availability || null,
          skills: data.skills || null,
          is_active: true,
        },
      ])
      .select('id')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return {
        success: false,
        error: 'Failed to submit volunteer application',
      };
    }

    // Log the volunteer signup
    await supabase.from('activity_log').insert([
      {
        action: 'New volunteer application',
        details: `${data.name} (${data.email}) applied to volunteer`,
      },
    ]);

    console.log('Volunteer application submitted successfully:', {
      name: data.name,
      email: data.email,
    });

    return {
      success: true,
      volunteerId: insertedVolunteer?.id,
    };
  } catch (err) {
    console.error('Volunteer submission error:', err);
    return {
      success: false,
      error: 'An error occurred while submitting your volunteer application',
    };
  }
}
