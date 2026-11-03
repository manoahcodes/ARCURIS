import { useEffect, useOptimistic, useState, useTransition } from "react";

/**
 * Optimistic select that saves through a server action.
 * If the action throws, the select goes back to the saved value (React drops
 * the optimistic value when the transition ends) and `failed` is true for 4 seconds.
 */
export function useSelectAction(
  selectedId: string,
  action: (id: string) => Promise<void>,
) {
  const [pending, startTransition] = useTransition();
  const [optimisticId, setOptimisticId] = useOptimistic(selectedId);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!failed) return;
    const timer = setTimeout(() => setFailed(false), 4000);
    return () => clearTimeout(timer);
  }, [failed]);

  const change = (id: string) => {
    setFailed(false);
    startTransition(async () => {
      setOptimisticId(id);
      try {
        await action(id);
      } catch {
        setFailed(true);
      }
    });
  };

  return { optimisticId, pending, failed, change };
}