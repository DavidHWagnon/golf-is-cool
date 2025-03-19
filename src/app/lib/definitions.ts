export type Player = {
    PlayerID: number;
    FirstName: string;
    LastName: string
    Weight: number;
    Swings: string;
    PgaDebut: number;
    BirthDate: Date;
    BirthCity: string;
    BirthState: string;
    College: string;
    PhotoUrl: string;
    SportRadarPlayerID: string;
    PgaTourPlayerID: number;
    RotoworldPlayerID: number;
    RotoWirePlayerID: number;
    FantasyAlarmPlayerID: number;
    DraftKingsName: string;
    FantasyDraftName: string;
    FanDuelName: string;
    FantasyDraftPlayerID: number;
    DraftKingsPlayerID: number;
    FanDuelPlayerID: number;
    YahooPlayerID: number;
}

export type GolfRanking = {
    PlayerSeasonID: number;
    Season: number;
    PlayerID: number
    Name: string;
    WorldGoldRank: number;
    WorldGoldRankLastWeek: number;
    Events: number;
    AveragePoints: number;
    TotalPoints: number;
    PointsLost: number;
    PointsGained: number;
}
