export const getReceiverIds = (
  participantIds: number[],
  loogedInUserId: number,
): number[] => participantIds.filter(participantId => participantId !== loogedInUserId);
