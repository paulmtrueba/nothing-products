// export type BoardStatusType = "IN_PROGRESS" | "DONE" | "ERROR";

export interface ConfigurationCenterType {
	lat: number;
	lng: numnber;
}

export interface MapBoundsConfigurationType {
	north: number;
	east: number;
	south: number;
	west: number;
}

export interface ConfigurationType {
    center: ConfigurationCenterType;
	startZoom: number;
	defaultMapType: string;
	mapBounds: MapBoundsConfigurationType;
	mapTypes: string[];
}

export interface UseConfigurationType {
    workingConfig: ConfigurationType;
    setWorkingConfig: Function;
}
