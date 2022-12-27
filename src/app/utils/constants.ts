export class Constants {
  public static get KEY_LOCAL_STORAGE_PARTICIPANTS(): string { return 'participantsJson'; };
  public static get KEY_LOCAL_STORAGE_WINNERS(): string { return 'winnersJson'; };
  public static get PARTICIPANTS_MOCK_URL(): string { return "/assets/data/participants.json" };
  public static get WINNERS_MOCK_URL(): string { return "/assets/data/winners.json" };
}
