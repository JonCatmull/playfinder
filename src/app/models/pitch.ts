import { Venue } from './venue';

export interface Pitch {
    id: number;
    type: string;
    attributes: {
        about: string;
        avaiable_slots: {
            morning: number;
            evening: number;
            weekend: number;
        };
        available_slots_total: number;
        facilities: any[];
        featured: boolean;
        featuredOrder: number;
        format: string;
        images: {
            small: string[];
            medium: string[];
            large: string[];
        };
        mlp: boolean;
        name: string;
        online_booking: boolean;
        operator: any; // check
        opt_in_third_parties: boolean;
        payment: {desc1: any, desc2: any, key: any, value: any}[];
        showFFPopup: boolean;
        sport: string;
        status: string;
        surface: string;
        tac_link: string;
    };
    links: {
        self: string;
        weblink: string;
    };
    relationships: {
        venues: {
            data: any;
        };
        pitchImages: {
            data: {id: number, type: string}[];
        };
    };
}
