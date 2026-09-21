import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type PageDocumentDataSlicesSlice = MediaGridSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *Settings → footer_links*
 */
export interface SettingsDocumentDataFooterLinksItem {
	/**
	 * label field in *Settings → footer_links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Instagram
	 * - **API ID Path**: settings.footer_links[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * link field in *Settings → footer_links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.footer_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Settings → navigation*
 */
export interface SettingsDocumentDataNavigationItem {
	/**
	 * label field in *Settings → navigation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * link field in *Settings → navigation*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Show on version (White = Malak Haynes / Black = Very Inner Vibrations) field in *Settings → navigation*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Both
	 * - **API ID Path**: settings.navigation[].visible_on
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	visible_on: prismic.SelectField<"Both" | "White only" | "Black only", "filled">;
}

type SettingsDocumentDataSlicesSlice = never

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Logo field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Footer text (optional) field in *Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.footer_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	footer_text: prismic.RichTextField;
	
	/**
	 * footer_links field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.footer_links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_links: prismic.GroupField<Simplify<SettingsDocumentDataFooterLinksItem>>;
	
	/**
	 * navigation field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	navigation: prismic.GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
	
	/**
	 * Slice Zone field in *Settings*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<SettingsDocumentDataSlicesSlice>;/**
	 * Intro video (.mp4 upload) — optional field in *Settings*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: Upload or select an mp4
	 * - **API ID Path**: settings.intro_video
	 * - **Tab**: Intro
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	intro_video: prismic.LinkToMediaField<prismic.FieldState, never>;

	/**
	 * Intro video URL (.m3u8 HLS or .mp4) — optional; overrides the uploaded file above field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: https://…/playlist.m3u8
	 * - **API ID Path**: settings.intro_video_url
	 * - **Tab**: Intro
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	intro_video_url: prismic.KeyTextField;

	/**
	 * Intro image — optional; shown if no video is set. If you don't upload anything, it's just going to be text field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.intro_image
	 * - **Tab**: Intro
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	intro_image: prismic.ImageField<never>;

	/**
	 * Rounded media corners (30px) — applies to every image/video across the site field in *Settings*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: settings.rounded_media
	 * - **Tab**: Style
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	rounded_media: prismic.BooleanField;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = PageDocument | SettingsDocument;

/**
 * Item in *MediaGrid → Default → Primary → Items*
 */
export interface MediaGridSliceDefaultPrimaryItemsItem {
	/**
	 * Content type field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Image
	 * - **API ID Path**: media_grid.default.primary.items[].content_type
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	content_type: prismic.SelectField<"Video" | "Image" | "Embed" | "Text", "filled">;
	
	/**
	 * Video file (.mp4 upload) field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: Upload or select an mp4
	 * - **API ID Path**: media_grid.default.primary.items[].video
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	video: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * Video URL (.m3u8 HLS stream or .mp4) — paste an external link; overrides the uploaded file above field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: https://…/playlist.m3u8
	 * - **API ID Path**: media_grid.default.primary.items[].video_url
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	video_url: prismic.KeyTextField;
	
	/**
	 * Poster / still image (Video) — when set, the grid shows this still and clicking it follows the item's Link instead of playing inline field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.items[].poster
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	poster: prismic.ImageField<never>;
	
	/**
	 * Image field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.items[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Embed (YouTube / Vimeo / SoundCloud) field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: Paste a URL
	 * - **API ID Path**: media_grid.default.primary.items[].embed
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	embed: prismic.EmbedField
	
	/**
	 * Text field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.items[].text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
	
	/**
	 * Caption (Enter = new row) field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.items[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	caption: prismic.RichTextField;
	
	/**
	 * Link (optional — makes the item clickable) field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.items[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Size (Grid mode only) field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: medium
	 * - **API ID Path**: media_grid.default.primary.items[].size
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	size: prismic.SelectField<"small" | "medium" | "large" | "full-screen", "filled">;
	
	/**
	 * Image fit field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: contain
	 * - **API ID Path**: media_grid.default.primary.items[].object_fit
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	object_fit: prismic.SelectField<"contain" | "cover" | "fill", "filled">;
	
	/**
	 * Image height field in *MediaGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: auto
	 * - **API ID Path**: media_grid.default.primary.items[].image_height
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	image_height: prismic.SelectField<"auto" | "300px" | "400px" | "500px" | "600px" | "700px" | "800px", "filled">;
}

/**
 * Primary content in *MediaGrid → Default → Primary*
 */
export interface MediaGridSliceDefaultPrimary {
	/**
	 * Shared caption (optional — used when every item shares the same caption, instead of filling in each item's own Caption field) field in *MediaGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.shared_caption
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	shared_caption: prismic.RichTextField;
	
	/**
	 * TITLE field in *MediaGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.section_title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	section_title: prismic.RichTextField;
	
	/**
	 * Display mode field in *MediaGrid → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Grid
	 * - **API ID Path**: media_grid.default.primary.display_mode
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	display_mode: prismic.SelectField<"Grid" | "Slider", "filled">;
	
	/**
	 * Items per row (Grid) / slides per view (Slider) field in *MediaGrid → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: 1
	 * - **API ID Path**: media_grid.default.primary.items_per_row
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	items_per_row: prismic.SelectField<"1" | "2" | "3" | "4", "filled">;
	
	/**
	 * Gaps (spacing between items & grid width) field in *MediaGrid → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: normal
	 * - **API ID Path**: media_grid.default.primary.gaps
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	gaps: prismic.SelectField<"normal" | "full-screen", "filled">;
	
	/**
	 * Items field in *MediaGrid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: media_grid.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<MediaGridSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for MediaGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MediaGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MediaGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *MediaGrid*
 */
type MediaGridSliceVariation = MediaGridSliceDefault

/**
 * MediaGrid Shared Slice
 *
 * - **API ID**: `media_grid`
 * - **Description**: Reusable grid OR slider of media items (video / image / embed / text), each with a caption, size and optional link.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MediaGridSlice = prismic.SharedSlice<"media_grid", MediaGridSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			SettingsDocumentDataFooterLinksItem,
			SettingsDocumentDataNavigationItem,
			SettingsDocumentDataSlicesSlice,
			AllDocumentTypes,
			MediaGridSlice,
			MediaGridSliceDefaultPrimaryItemsItem,
			MediaGridSliceDefaultPrimary,
			MediaGridSliceVariation,
			MediaGridSliceDefault
		}
	}
}