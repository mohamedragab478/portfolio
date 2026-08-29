import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import { portfolioData } from '../data/portfolioData';

const API_BASE = '/api';

/**
 * Custom hook to fetch projects collection, falling back to static portfolioData.
 */
export function useProjects() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/projects`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const projects = Array.isArray(data) && data.length > 0 ? data : portfolioData.projects;

  return {
    projects,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch skills collection, falling back to static portfolioData.
 */
export function useSkills() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/skills`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const skills = Array.isArray(data) && data.length > 0 ? data : portfolioData.skills;

  return {
    skills,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch certificates collection, falling back to static portfolioData.
 */
export function useCertificates() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/certificates`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const certificates = Array.isArray(data) && data.length > 0 ? data : portfolioData.certifications;

  return {
    certificates,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch settings document, falling back to static portfolioData.personalInfo & heroStats.
 */
export function useSettings() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/settings`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const fetchedSettings = Array.isArray(data) ? data[0] : data;

  const defaultSettings = {
    ...portfolioData.personalInfo,
    heroStats: portfolioData.heroStats,
  };

  const settings = fetchedSettings
    ? { ...defaultSettings, ...fetchedSettings }
    : defaultSettings;

  return {
    settings,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch services collection, falling back to static portfolioData.
 */
export function useServices() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/collection?name=services`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const services = Array.isArray(data) && data.length > 0 ? data : portfolioData.services;

  return {
    services,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch trainings collection, falling back to static portfolioData.
 */
export function useTrainings() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/collection?name=trainings`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const trainings = Array.isArray(data) && data.length > 0 ? data : portfolioData.certifications;

  return {
    trainings,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch education degree config, falling back to static portfolioData.
 */
export function useEducationDegree() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/config?key=educationDegree`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const education = data || portfolioData.educationDegree;

  return {
    education,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}

/**
 * Custom hook to fetch about config, falling back to static portfolioData.
 */
export function useAboutConfig() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`${API_BASE}/config?key=about`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  const aboutConfig = data || portfolioData.aboutConfig;

  return {
    aboutConfig,
    isLoading: isLoading && !error && !data,
    isError: error,
    error,
    isValidating,
    mutate,
  };
}
