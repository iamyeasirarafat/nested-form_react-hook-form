import axios from "axios";

import { useFieldArray, useForm } from "react-hook-form";

const CollectionGenerator = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fields: [
                {
                    object: [{}],
                },
            ],
        },
    });
    const {
        fields: fields,
        append: fieldsAppend,
        remove: fieldsRemove,
    } = useFieldArray({
        control,
        name: "fields",
    });
    const onSubmit = async (data) => {
        // const res = await axios.post("https://v3dev.globalomls.com/generate/collection", {
        //     ...data,
        // });
        console.log(data);
    };
    // const onSubmit = (data) => console.log(JSON.parse(data.fields[0]?.validate.oneof));
    const fieldTypes = [
        { value: "float", label: "Float" },
        { value: "string", label: "String" },
        { value: "object", label: "Object" },
        { value: "array", label: "List" },
        { value: "objectId", label: "Object id" },
        { value: "bool", label: "Boolean" },
        { value: "date", label: "DateTime" },
        { value: "int", label: "Integer" },
        { value: "timestamp", label: "TimeDelta" },
        { value: "decimal", label: "Decimal" },
        { value: "email", label: "Email" },
        { value: "url", label: "Url" },
        { value: "uuid", label: "UUID" },
        { value: "relation", label: "relation" },
    ];
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Collection Generator</h2>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    width: "50%",
                    margin: "0 auto",
                    padding: "20px 0",
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <input type="text" placeholder="collection Label" {...register("name")} />
                <textarea
                    name="collectionDescription"
                    placeholder="collection description"
                    {...register("collectionDescription")}
                />
                {fields.map((item, index) => {
                    return (
                        <div
                            style={{
                                gap: "20px",
                            }}
                            key={item.id}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                }}
                            >
                                <h2>field:#{index}</h2>
                                <input
                                    type="text"
                                    placeholder="field Label"
                                    {...register(`fields.${index}.name`)}
                                />
                                <select
                                    placeholder="Field Type"
                                    {...register(`fields.${index}.type`)}
                                >
                                    {fieldTypes.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {watch().fields[index].type === "object" && (
                                    <select {...register(`fields.${index}.object_type`)}>
                                        <option value="single">single</option>
                                        <option value="list">list</option>
                                    </select>
                                )}
                                <select {...register(`fields.${index}.required`)}>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Field hint"
                                    {...register(`fields.${index}.hint`)}
                                />
                                <input
                                    type="text"
                                    placeholder="Field placeholder"
                                    {...register(`fields.${index}.placeholder`)}
                                />
                                <select
                                    name="width"
                                    {...register(`fields.${index}.width`)}
                                    placeholder="Field width"
                                >
                                    <option value="25">25%</option>
                                    <option value="33">33%</option>
                                    <option value="50">50%</option>
                                    <option value="100">100%</option>
                                </select>
                                <div className="">
                                    <input
                                        {...register(`fields.${index}.validate`)}
                                        type="checkbox"
                                        id={`validate${index}`}
                                    />
                                    <label htmlFor={`validate${index}`}>validate</label>
                                </div>
                                {watch().fields[index].validate && (
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                        }}
                                    >
                                        <input
                                            {...register(`fields.${index}.validate.length.min`)}
                                            type="text"
                                            placeholder="Min length"
                                        />
                                        <input
                                            {...register(`fields.${index}.validate.length.max`)}
                                            type="text"
                                            placeholder="Max length"
                                        />
                                        <input
                                            {...register(`fields.${index}.validate.range.min`)}
                                            type="text"
                                            placeholder="Min Range"
                                        />
                                        <input
                                            {...register(`fields.${index}.validate.range.max`)}
                                            type="text"
                                            placeholder="Max Range"
                                        />
                                        <input
                                            {...register(`fields.${index}.validate.oneof`)}
                                            type="text"
                                            placeholder={`["a","b","c"]`}
                                        />
                                    </div>
                                )}
                            </div>
                            {watch().fields[index].type === "object" && (
                                <>
                                    {item.object.map((obejctItem, i) => {
                                        return (
                                            <div
                                                style={{
                                                    width: "80%",
                                                    marginLeft: "auto",
                                                }}
                                                key={obejctItem.id}
                                            >
                                                <h2>Object field:#{i}</h2>
                                                <input
                                                    type="text"
                                                    placeholder="field Label"
                                                    {...register(
                                                        `fields.${index}.object.${i}.name`
                                                    )}
                                                />

                                                <select
                                                    placeholder="Field Type"
                                                    {...register(
                                                        `fields.${index}.object.${i}.type`
                                                    )}
                                                >
                                                    {fieldTypes.map((item) => {
                                                        if (item.value !== "object") {
                                                            return (
                                                                <option
                                                                    key={item.value}
                                                                    value={item.value}
                                                                >
                                                                    {item.label}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </select>
                                                <select
                                                    {...register(
                                                        `fields.${index}.object.${i}.required`
                                                    )}
                                                >
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    placeholder="Field hint"
                                                    {...register(
                                                        `fields.${index}.object.${i}.hint`
                                                    )}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Field placeholder"
                                                    {...register(
                                                        `fields.${index}.object.${i}.placeholder`
                                                    )}
                                                />
                                                <select
                                                    name="width"
                                                    {...register(
                                                        `fields.${index}.object.${i}.width`
                                                    )}
                                                    placeholder="Field width"
                                                >
                                                    <option value="25">25%</option>
                                                    <option value="33">33%</option>
                                                    <option value="50">50%</option>
                                                    <option value="100">100%</option>
                                                </select>
                                                <div className="">
                                                    <input
                                                        {...register(
                                                            `fields.${index}.object.${i}.validate`
                                                        )}
                                                        type="checkbox"
                                                        id={`validate${id + i + index}`}
                                                    />
                                                    <label htmlFor={`validate${id + i + index}`}>
                                                        validate
                                                    </label>
                                                </div>
                                                {watch().fields[index].object[i].validate && (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <input
                                                            {...register(
                                                                `fields.${index}.object.${i}.validate.length.min`
                                                            )}
                                                            type="text"
                                                            placeholder="Min length"
                                                        />
                                                        <input
                                                            {...register(
                                                                `fields.${index}.object.${i}.validate.length.max`
                                                            )}
                                                            type="text"
                                                            placeholder="Max length"
                                                        />
                                                        <input
                                                            {...register(
                                                                `fields.${index}.object.${i}.validate.range.min`
                                                            )}
                                                            type="text"
                                                            placeholder="Min Range"
                                                        />
                                                        <input
                                                            {...register(
                                                                `fields.${index}.object.${i}.validate.range.max`
                                                            )}
                                                            type="text"
                                                            placeholder="Max Range"
                                                        />
                                                        <input
                                                            {...register(
                                                                `fields.${index}.object.${i}.validate.oneof`
                                                            )}
                                                            type="text"
                                                            placeholder={`["a","b","c"]`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    <button onClick={() => item.object.push({})}>
                                        Add Another object
                                    </button>
                                </>
                            )}
                            {watch().fields[index].type === "relation" && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Database Name"
                                        {...register(`fields.${index}.rel_info.dbname`)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Collection Name"
                                        {...register(`fields.${index}.rel_info.collname`)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="refference id"
                                        {...register(`fields.${index}.rel_info.referance`)}
                                    />
                                    <select
                                        {...register(`fields.${index}.rel_info.type`)}
                                        placeholder="Field width"
                                    >
                                        <option value="one-to-one">one-to-one</option>
                                        <option value="one-to-many">one-to-many</option>
                                        <option value="many-to-many">many-to-many</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    );
                })}
                <button onClick={() => fieldsAppend({ object: [{}] })}>Add Another</button>
                <button type="submit">submit</button>
            </form>
        </div>
    );
};
export default CollectionGenerator;
