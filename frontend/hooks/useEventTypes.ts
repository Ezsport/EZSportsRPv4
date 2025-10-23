import { useState, useEffect } from 'react';
import { ServiceEventType, EventType, EventTypeQueryParams } from '@/lib/services/service-event-type';

export function useEventTypes(initialParams?: EventTypeQueryParams) {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<EventTypeQueryParams>(initialParams || {});

  const fetchEventTypes = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceEventType.getAll(params);
      setEventTypes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch event types');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createEventType = async (eventTypeData: Omit<EventType, 'id'>) => {
    try {
      const newEventType = await ServiceEventType.create(eventTypeData);
      setEventTypes(prevEventTypes => [...prevEventTypes, newEventType]);
      return newEventType;
    } catch (err: any) {
      setError(err.message || 'Failed to create event type');
      console.error(err);
      throw err;
    }
  };

  const updateEventType = async (eventTypeId: string, eventTypeData: Partial<EventType>) => {
    try {
      const updatedEventType = await ServiceEventType.update(eventTypeId, eventTypeData);
      setEventTypes(prevEventTypes => 
        prevEventTypes.map(eventType => 
          eventType.id === eventTypeId ? { ...eventType, ...updatedEventType } : eventType
        )
      );
      return updatedEventType;
    } catch (err: any) {
      setError(err.message || 'Failed to update event type');
      console.error(err);
      throw err;
    }
  };

  const deleteEventType = async (eventTypeId: string) => {
    try {
      await ServiceEventType.delete(eventTypeId);
      setEventTypes(prevEventTypes => prevEventTypes.filter(eventType => eventType.id !== eventTypeId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete event type');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: EventTypeQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchEventTypes();
  }, [JSON.stringify(params)]);

  return {
    eventTypes,
    isLoading,
    error,
    fetchEventTypes,
    createEventType,
    updateEventType,
    deleteEventType,
    updateParams
  };
}
