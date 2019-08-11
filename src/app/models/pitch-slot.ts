export interface PitchSlot {
    id: string;
    type: string;
    attributes: {
        admin_fee: string;
        availabilities: number;
        currency: string;
        ends: string;
        price: string;
        starts: string;
    };
}
