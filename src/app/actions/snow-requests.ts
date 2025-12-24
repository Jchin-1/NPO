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

export interface CleanupRecommendationFormData {
  name: string;
  email: string;
  phone?: string;
  locationName: string;
  locationType: 'park' | 'street' | 'playground' | 'parking-lot' | 'other';
  address: string;
  description: string;
  cleanupType: 'litter' | 'graffiti' | 'overgrowth' | 'snow-removal' | 'multiple';
  urgency: 'low' | 'medium' | 'high';
}

export interface SubmitCleanupRecommendationResponse {
  success: boolean;
  error?: string;
  recommendationId?: string;
}

/**
 * Server action to submit a public space cleanup recommendation
 * Saves the recommendation to the Supabase PostgreSQL database
 * 
 * @param formData - The cleanup recommendation form data
 * @returns Success/error response with recommendation ID
 */
export async function submitCleanupRecommendation(
  formData: CleanupRecommendationFormData
): Promise<SubmitCleanupRecommendationResponse> {
  try {
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.locationName ||
      !formData.locationType ||
      !formData.address ||
      !formData.description ||
      !formData.cleanupType ||
      !formData.urgency
    ) {
      return {
        success: false,
        error: 'Please fill in all required fields',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    // Validate phone format if provided
    if (formData.phone) {
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (!phoneRegex.test(formData.phone)) {
        return {
          success: false,
          error: 'Please enter a valid phone number',
        };
      }
    }

    // Validate enum values
    const validLocationTypes = ['park', 'street', 'playground', 'parking-lot', 'other'];
    const validCleanupTypes = ['litter', 'graffiti', 'overgrowth', 'snow-removal', 'multiple'];
    const validUrgencies = ['low', 'medium', 'high'];

    if (!validLocationTypes.includes(formData.locationType)) {
      return {
        success: false,
        error: 'Invalid location type',
      };
    }

    if (!validCleanupTypes.includes(formData.cleanupType)) {
      return {
        success: false,
        error: 'Invalid cleanup type',
      };
    }

    if (!validUrgencies.includes(formData.urgency)) {
      return {
        success: false,
        error: 'Invalid urgency level',
      };
    }

    // Insert into database
    const { data, error } = await supabase
      .from('cleanup_recommendations')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          location_name: formData.locationName,
          location_type: formData.locationType,
          address: formData.address,
          description: formData.description,
          cleanup_type: formData.cleanupType,
          urgency: formData.urgency,
          status: 'pending',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      return {
        success: false,
        error: 'Failed to submit cleanup recommendation. Please try again later.',
      };
    }

    // Log activity
    await supabase.from('activity_log').insert([
      {
        action: 'New cleanup recommendation',
        details: JSON.stringify({
          name: formData.name,
          email: formData.email,
          locationName: formData.locationName,
          locationType: formData.locationType,
          cleanupType: formData.cleanupType,
          urgency: formData.urgency,
        }),
      },
    ]);

    console.log('Cleanup recommendation submitted successfully:', {
      name: formData.name,
      email: formData.email,
      locationName: formData.locationName,
    });

    return {
      success: true,
      recommendationId: data?.id,
    };
  } catch (err) {
    console.error('Cleanup recommendation submission error:', err);
    return {
      success: false,
      error: 'An error occurred while submitting your cleanup recommendation',
    };
  }
}

export interface FoodClothsDriveFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  driveType: 'food' | 'clothes' | 'both';
  itemsDescription: string;
  quantity: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
}

export interface SubmitFoodClothsDriveResponse {
  success: boolean;
  error?: string;
  donationId?: string;
}

/**
 * Server action to submit a food/clothes drive donation request
 * Saves the donation to the Supabase PostgreSQL database for volunteer pickup
 * 
 * @param formData - The food/clothes drive form data
 * @returns Success/error response with donation ID
 */
export async function submitFoodClothsDrive(
  formData: FoodClothsDriveFormData
): Promise<SubmitFoodClothsDriveResponse> {
  try {
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.driveType ||
      !formData.itemsDescription ||
      !formData.quantity ||
      !formData.pickupDate ||
      !formData.pickupTime
    ) {
      return {
        success: false,
        error: 'Please fill in all required fields',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    // Validate phone format
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(formData.phone)) {
      return {
        success: false,
        error: 'Please enter a valid phone number',
      };
    }

    // Validate drive type
    const validDriveTypes = ['food', 'clothes', 'both'];
    if (!validDriveTypes.includes(formData.driveType)) {
      return {
        success: false,
        error: 'Invalid drive type',
      };
    }

    // Insert into database
    const { data, error } = await supabase
      .from('food_clothes_drives')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          drive_type: formData.driveType,
          items_description: formData.itemsDescription,
          quantity: formData.quantity,
          pickup_date: formData.pickupDate,
          pickup_time: formData.pickupTime,
          special_instructions: formData.specialInstructions || null,
          status: 'pending',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      return {
        success: false,
        error: 'Failed to submit donation request. Please try again later.',
      };
    }

    // Log activity
    await supabase.from('activity_log').insert([
      {
        action: 'New food/clothes drive donation request',
        details: JSON.stringify({
          name: formData.name,
          email: formData.email,
          driveType: formData.driveType,
          quantity: formData.quantity,
          pickupDate: formData.pickupDate,
        }),
      },
    ]);

    console.log('Food/clothes drive submitted successfully:', {
      name: formData.name,
      email: formData.email,
      driveType: formData.driveType,
    });

    return {
      success: true,
      donationId: data?.id,
    };
  } catch (err) {
    console.error('Food/clothes drive submission error:', err);
    return {
      success: false,
      error: 'An error occurred while submitting your donation request',
    };
  }
}
