import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

const API_BASE = '/api';

/**
 * Custom hook to fetch projects collection.
 */
export function useProjects() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/projects`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    projects: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch skills collection.
 */
export function useSkills() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/skills`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    skills: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch certificates collection.
 */
export function useCertificates() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/certificates`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    certificates: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch settings document.
 */
export function useSettings() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/settings`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  // Settings can return an object or array of settings
  const settings = Array.isArray(data) ? data[0] : data;

  return {
    settings: settings || null,
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch services collection.
 */
export function useServices() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/collection?name=services`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    services: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch trainings collection.
 */
export function useTrainings() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/collection?name=trainings`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    trainings: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch education degree config.
 */
export function useEducationDegree() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/config?key=educationDegree`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    education: data || null,
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch about config.
 */
export function useAboutConfig() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/config?key=about`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    aboutConfig: data || null,
    isLoading,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}
